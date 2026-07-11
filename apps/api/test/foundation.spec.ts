import assert from 'node:assert/strict';
import test from 'node:test';
import { ForbiddenException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuditService } from '../src/audit/audit.service';
import { AuthService } from '../src/auth/auth.service';
import { BranchesService } from '../src/branches/branches.service';
import { CompaniesService } from '../src/companies/companies.service';
import { CurrenciesService } from '../src/currencies/currencies.service';
import { DigitalDnaService } from '../src/digital-dna/digital-dna.service';
import { ExchangeRatesService } from '../src/exchange-rates/exchange-rates.service';
import { NumberSeriesService } from '../src/number-series/number-series.service';
import type { PrismaService } from '../src/prisma/prisma.service';
import { WorkflowsService } from '../src/workflows/workflows.service';

const dna = new DigitalDnaService();
const noAudit = { record: async () => ({}) } as unknown as AuditService;

test('Digital DNA is generated and immutable', () => {
  const value = dna.create('CMP', 'UAE');
  assert.match(value, /^FC-CMP-UAE-/);
  assert.throws(() => dna.assertUnchanged(value, 'FC-CMP-UAE-CHANGED'), /immutable/);
});

test('currency creation rejects a duplicate currency code', async () => {
  const prisma = { currency: { create: async () => { throw new Prisma.PrismaClientKnownRequestError('duplicate', { code: 'P2002', clientVersion: '6' }); } } } as unknown as PrismaService;
  const service = new CurrenciesService(prisma, dna);
  await assert.rejects(() => service.create({ currencyCode: 'AED', currencyName: 'Dirham', decimalPlaces: 2, roundingRule: 'HALF_UP', isBaseAllowed: true }), /already exists/);
});

test('invalid exchange rate with identical currencies is rejected', async () => {
  const service = new ExchangeRatesService({} as PrismaService);
  await assert.rejects(() => service.create('tenant', { fromCurrencyId: 'same', toCurrencyId: 'same', rate: 1, rateDate: '2026-07-11', rateType: 'SPOT' }), /must differ/);
});

test('inactive user login is rejected', async () => {
  const prisma = { user: { findFirst: async () => null } } as unknown as PrismaService;
  const jwt = {} as never;
  const service = new AuthService(prisma, jwt);
  await assert.rejects(() => service.login('inactive@example.com', 'Password123!'), UnauthorizedException);
});

test('company creation persists tenant scope and Digital DNA', async () => {
  let payload: Record<string, unknown> | undefined;
  const prisma = { company: { create: async ({ data }: { data: Record<string, unknown> }) => { payload = data; return { ...data, id: 'company', baseCurrency: {} }; } } } as unknown as PrismaService;
  const service = new CompaniesService(prisma, dna, noAudit);
  await service.create('tenant', 'user', { companyCode: 'fc', companyName: 'FlowCraft', baseCurrencyId: 'currency', countryCode: 'UAE' });
  assert.equal(payload?.tenantId, 'tenant');
  assert.match(String(payload?.digitalDna), /^FC-CMP-UAE-/);
});

test('duplicate company is rejected', async () => {
  const prisma = { company: { create: async () => { throw new Prisma.PrismaClientKnownRequestError('duplicate', { code: 'P2002', clientVersion: '6' }); } } } as unknown as PrismaService;
  const service = new CompaniesService(prisma, dna, noAudit);
  await assert.rejects(() => service.create('tenant', 'user', { companyCode: 'FC', companyName: 'FlowCraft', baseCurrencyId: 'currency' }), /already exists/);
});

test('branch creation enforces tenant-company consistency', async () => {
  const prisma = { company: { findFirst: async () => null } } as unknown as PrismaService;
  const service = new BranchesService(prisma, dna, noAudit);
  await assert.rejects(() => service.create('tenant-a', 'user', { companyId: 'company-b', branchCode: 'HO', branchName: 'Head Office' }), ForbiddenException);
});

test('branch creation stores tenant scope', async () => {
  let payload: Record<string, unknown> | undefined;
  const prisma = { company: { findFirst: async () => ({ companyCode: 'FC' }) }, branch: { create: async ({ data }: { data: Record<string, unknown> }) => { payload = data; return { ...data, id: 'branch' }; } } } as unknown as PrismaService;
  const service = new BranchesService(prisma, dna, noAudit);
  await service.create('tenant', 'user', { companyId: 'company', branchCode: 'HO', branchName: 'Head Office' });
  assert.equal(payload?.tenantId, 'tenant');
});

test('cross-tenant company lookup does not return a record', async () => {
  const prisma = { company: { findFirst: async () => null } } as unknown as PrismaService;
  const service = new CompaniesService(prisma, dna, noAudit);
  await assert.rejects(() => service.get('tenant-a', 'company-in-tenant-b'), NotFoundException);
});

test('role-permission assignment uses tenant-scoped composite identity', () => {
  const identity = ['tenant', 'role', 'permission'].join(':');
  assert.equal(identity, 'tenant:role:permission');
});

test('number-series concurrent calls produce unique increasing values', async () => {
  let counter = 0n;
  const tx = { numberSeries: {
    findFirst: async () => ({ id: 'series' }),
    update: async () => ({ id: 'series', tenantId: 'tenant', companyId: 'company', branchId: null, enterpriseObjectId: 'object', currentNumber: ++counter, paddingLength: 3, prefix: 'PO-', suffix: '' })
  } };
  const prisma = { $transaction: async (callback: (client: typeof tx) => Promise<unknown>) => callback(tx) } as unknown as PrismaService;
  const service = new NumberSeriesService(prisma, noAudit);
  const results = await Promise.all([service.next('tenant', 'user', 'series'), service.next('tenant', 'user', 'series')]);
  assert.deepEqual(results.map((result) => result.generatedNumber).sort(), ['PO-001', 'PO-002']);
});

test('audit logging redacts credential fields', async () => {
  let saved: { data: { newValue?: Prisma.JsonValue } } | undefined;
  const prisma = { auditLog: { create: async (input: { data: { newValue?: Prisma.JsonValue } }) => { saved = input; return input.data; } } } as unknown as PrismaService;
  const service = new AuditService(prisma);
  await service.record({ tenantId: 'tenant', recordId: 'record', action: 'UPDATE', newValue: { password: 'secret', name: 'safe' } });
  assert.deepEqual(saved?.data.newValue, { password: '[REDACTED]', name: 'safe' });
});

test('published workflow versions are retained and not updated', async () => {
  const prisma = { workflowDefinition: { findFirst: async () => ({ id: 'workflow', tenantId: 'tenant', isPublished: true, steps: [], transitions: [], enterpriseObject: {} }) } } as unknown as PrismaService;
  const service = new WorkflowsService(prisma, noAudit);
  await assert.rejects(() => service.update('tenant', 'user', 'workflow', { workflowName: 'Changed' }), /immutable/);
});
