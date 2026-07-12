import { ModuleCode, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const roles = [
  ['SUPER_ADMIN', 'Super Admin'], ['SYSTEM_ADMINISTRATOR', 'System Administrator'], ['CEO', 'CEO'],
  ['FINANCE_MANAGER', 'Finance Manager'], ['PURCHASE_MANAGER', 'Purchase Manager'], ['SALES_MANAGER', 'Sales Manager'],
  ['PRODUCTION_MANAGER', 'Production Manager'], ['PLANNING_MANAGER', 'Planning Manager'], ['WAREHOUSE_MANAGER', 'Warehouse Manager'],
  ['QUALITY_MANAGER', 'Quality Manager'], ['MAINTENANCE_MANAGER', 'Maintenance Manager'], ['ENGINEERING_MANAGER', 'Engineering Manager'],
  ['AUDITOR', 'Auditor'], ['STANDARD_USER', 'Standard User']
] as const;

const objectRegister = [
  ['TENANT', 'Tenant', 'PLATFORM'], ['CURRENCY', 'Currency', 'FINANCE'], ['EXCHANGE_RATE', 'Exchange Rate', 'FINANCE'],
  ['COMPANY', 'Company', 'ORGANIZATION'], ['BRANCH', 'Branch', 'ORGANIZATION'], ['WAREHOUSE', 'Warehouse', 'WAREHOUSE'],
  ['USER', 'User', 'SECURITY'], ['ROLE', 'Role', 'SECURITY'], ['PERMISSION', 'Permission', 'SECURITY'],
  ['ENTERPRISE_OBJECT', 'Enterprise Object', 'PLATFORM'], ['OBJECT_FIELD', 'Object Field', 'PLATFORM'], ['OBJECT_RELATIONSHIP', 'Object Relationship', 'PLATFORM'],
  ['WORKFLOW_DEFINITION', 'Workflow Definition', 'WORKFLOW'], ['NUMBER_SERIES', 'Number Series', 'PLATFORM'], ['AUDIT_LOG', 'Audit Log', 'SECURITY'],
  ['ITEM', 'Item', 'INVENTORY'], ['ITEM_CATEGORY', 'Item Category', 'INVENTORY'], ['UNIT_OF_MEASURE', 'Unit of Measure', 'INVENTORY'],
  ['SUPPLIER', 'Supplier', 'PURCHASING'], ['CUSTOMER', 'Customer', 'SALES'], ['PURCHASE_REQUEST', 'Purchase Request', 'PURCHASING'],
  ['REQUEST_FOR_QUOTATION', 'Request for Quotation', 'PURCHASING'], ['SUPPLIER_QUOTATION', 'Supplier Quotation', 'PURCHASING'],
  ['PURCHASE_ORDER', 'Purchase Order', 'PURCHASING'], ['GOODS_RECEIPT', 'Goods Receipt', 'PURCHASING'], ['SUPPLIER_INVOICE', 'Supplier Invoice', 'FINANCE'],
  ['PAYMENT', 'Payment', 'FINANCE'], ['SALES_INQUIRY', 'Sales Inquiry', 'SALES'], ['SALES_QUOTATION', 'Sales Quotation', 'SALES'],
  ['SALES_ORDER', 'Sales Order', 'SALES'], ['DELIVERY_NOTE', 'Delivery Note', 'SALES'], ['SALES_INVOICE', 'Sales Invoice', 'FINANCE'],
  ['RECEIPT', 'Receipt', 'FINANCE'], ['BILL_OF_MATERIALS', 'Bill of Materials', 'MANUFACTURING'], ['ROUTING', 'Routing', 'MANUFACTURING'],
  ['WORK_CENTER', 'Work Center', 'MANUFACTURING'], ['PRODUCTION_PLAN', 'Production Plan', 'MANUFACTURING'], ['WORK_ORDER', 'Work Order', 'MANUFACTURING'],
  ['MATERIAL_ISSUE', 'Material Issue', 'MANUFACTURING'], ['PRODUCTION_ENTRY', 'Production Entry', 'MANUFACTURING'], ['QUALITY_INSPECTION', 'Quality Inspection', 'QUALITY'],
  ['FINISHED_GOODS_RECEIPT', 'Finished Goods Receipt', 'WAREHOUSE'], ['STOCK_TRANSFER', 'Stock Transfer', 'WAREHOUSE'], ['STOCK_ADJUSTMENT', 'Stock Adjustment', 'WAREHOUSE'],
  ['MAINTENANCE_REQUEST', 'Maintenance Request', 'MAINTENANCE'], ['MAINTENANCE_WORK_ORDER', 'Maintenance Work Order', 'MAINTENANCE'],
  ['ASSET', 'Asset', 'MAINTENANCE'], ['CHART_OF_ACCOUNT', 'Chart of Account', 'FINANCE'], ['JOURNAL_ENTRY', 'Journal Entry', 'FINANCE'],
  ['FISCAL_YEAR', 'Fiscal Year', 'FINANCE']
] as const;

const actions = ['VIEW', 'CREATE', 'EDIT', 'ARCHIVE', 'APPROVE', 'REJECT', 'SUBMIT', 'CANCEL', 'IMPORT', 'EXPORT', 'CONFIGURE'] as const;

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { tenantCode: 'FLOWCRAFT-DEMO' },
    update: { tenantName: 'FlowCraft Demo Tenant', isActive: true, status: 'ACTIVE' },
    create: { tenantCode: 'FLOWCRAFT-DEMO', tenantName: 'FlowCraft Demo Tenant', subscriptionPlan: 'DEVELOPMENT' }
  });

  const currencies = await Promise.all([
    ['AED', 'UAE Dirham', 'د.إ', 2], ['USD', 'US Dollar', '$', 2], ['EUR', 'Euro', '€', 2], ['INR', 'Indian Rupee', '₹', 2]
  ].map(([code, name, symbol, decimalPlaces]) => prisma.currency.upsert({
    where: { currencyCode: String(code) }, update: {},
    create: { digitalDna: `FC-CUR-${code}`, currencyCode: String(code), currencyName: String(name), symbol: String(symbol), decimalPlaces: Number(decimalPlaces) }
  })));
  const aed = currencies.find((currency) => currency.currencyCode === 'AED')!;

  const company = await prisma.company.upsert({
    where: { tenantId_companyCode: { tenantId: tenant.id, companyCode: 'FCMFG' } },
    update: {},
    create: { tenantId: tenant.id, digitalDna: 'FC-CMP-UAE-000001', companyCode: 'FCMFG', companyName: 'FlowCraft Manufacturing Demo', legalName: 'FlowCraft Manufacturing Demo LLC', baseCurrencyId: aed.id, countryCode: 'UAE' }
  });
  const branch = await prisma.branch.upsert({
    where: { companyId_branchCode: { companyId: company.id, branchCode: 'HO' } },
    update: {},
    create: { tenantId: tenant.id, companyId: company.id, digitalDna: 'FC-BRN-FCMFG-000001', branchCode: 'HO', branchName: 'Head Office', branchType: 'HEAD_OFFICE', countryCode: 'UAE' }
  });

  await prisma.warehouse.upsert({ where: { companyId_code: { companyId: company.id, code: 'MAIN' } }, update: {}, create: { companyId: company.id, branchId: branch.id, code: 'MAIN', name: 'Main Warehouse' } });
  await prisma.moduleSetting.createMany({ data: Object.values(ModuleCode).map((module) => ({ clientId: tenant.id, module, enabled: true, settings: {} })), skipDuplicates: true });

  const roleRecords = await Promise.all(roles.map(([roleCode, roleName]) => prisma.accessRole.upsert({
    where: { tenantId_roleCode: { tenantId: tenant.id, roleCode } }, update: { roleName, isActive: true },
    create: { tenantId: tenant.id, roleCode, roleName, roleType: roleCode === 'SUPER_ADMIN' ? 'SYSTEM' : 'STANDARD' }
  })));

  const objects = await Promise.all(objectRegister.map(([objectCode, objectName, ownerModule]) => prisma.enterpriseObject.upsert({
    where: { objectCode }, update: { objectName, ownerModule },
    create: { objectCode, objectName, objectType: objectCode.includes('ORDER') || objectCode.includes('INVOICE') || objectCode.includes('ENTRY') ? 'TRANSACTION' : 'MASTER', objectCategory: ownerModule, objectFamily: ownerModule, ownerModule, framework: 'FEOM-002', tableName: objectCode.toLowerCase(), apiPath: `/api/v1/${objectCode.toLowerCase().replaceAll('_', '-')}`, supportsWorkflow: ['PURCHASE_ORDER', 'SALES_ORDER', 'WORK_ORDER'].includes(objectCode), supportsCustomFields: true, supportsImport: true, supportsExport: true, supportsPrint: true }
  })));

  await prisma.permission.createMany({ data: objects.flatMap((object) => actions.map((action) => ({ permissionCode: `${object.objectCode}.${action}`, permissionName: `${action} ${object.objectName}`, enterpriseObjectId: object.id, action: action.toLowerCase(), description: `${action} access for ${object.objectName}` }))), skipDuplicates: true });
  const allPermissions = await prisma.permission.findMany({ select: { id: true } });
  const superAdminRole = roleRecords.find((role) => role.roleCode === 'SUPER_ADMIN')!;
  await prisma.rolePermission.createMany({ data: allPermissions.map((permission) => ({ tenantId: tenant.id, roleId: superAdminRole.id, permissionId: permission.id, allowed: true })), skipDuplicates: true });

  const email = (process.env.SEED_ADMIN_EMAIL ?? 'admin@flowcraft.local').toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'FlowCraft123!';
  const admin = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email } },
    update: { passwordHash: await bcrypt.hash(password, 12), isActive: true, isDeleted: false, status: 'ACTIVE' },
    create: { tenantId: tenant.id, digitalDna: 'FC-USR-FLOWCRAFTDEMO-000001', username: 'admin', email, passwordHash: await bcrypt.hash(password, 12), fullName: 'FlowCraft Administrator', defaultCompanyId: company.id, defaultBranchId: branch.id }
  });
  await prisma.companyAccess.upsert({ where: { tenantId_userId_companyId: { tenantId: tenant.id, userId: admin.id, companyId: company.id } }, update: {}, create: { tenantId: tenant.id, userId: admin.id, companyId: company.id } });
  await prisma.branchAccess.upsert({ where: { tenantId_userId_branchId: { tenantId: tenant.id, userId: admin.id, branchId: branch.id } }, update: {}, create: { tenantId: tenant.id, userId: admin.id, companyId: company.id, branchId: branch.id } });
  const existingAssignment = await prisma.userRole.findFirst({ where: { tenantId: tenant.id, userId: admin.id, roleId: superAdminRole.id, companyId: company.id, branchId: branch.id } });
  if (!existingAssignment) await prisma.userRole.create({ data: { tenantId: tenant.id, userId: admin.id, roleId: superAdminRole.id, companyId: company.id, branchId: branch.id } });

  const companyObject = objects.find((object) => object.objectCode === 'COMPANY')!;
  await prisma.numberSeries.upsert({
    where: { id: '00000000-0000-4000-8000-000000000001' }, update: {},
    create: { id: '00000000-0000-4000-8000-000000000001', tenantId: tenant.id, companyId: company.id, branchId: branch.id, enterpriseObjectId: companyObject.id, seriesCode: 'COMPANY', prefix: 'CMP-', paddingLength: 6 }
  });

  await prisma.item.createMany({ data: [
    { companyId: company.id, sku: 'RM-AL-6061', name: 'Aluminium 6061 Bar', itemType: 'RAW_MATERIAL', uom: 'KG', reorderLevel: 500, standardCost: 4.8 },
    { companyId: company.id, sku: 'FG-VALVE-100', name: 'Precision Valve Assembly', itemType: 'FINISHED_GOOD', uom: 'EA', reorderLevel: 50, standardCost: 42.5 }
  ], skipDuplicates: true });

  console.log([
    'FlowCraft seed summary:',
    '- tenant seeded',
    `- currencies seeded (${currencies.length})`,
    '- company seeded',
    '- branch seeded',
    '- admin user seeded',
    `- roles seeded (${roleRecords.length})`,
    `- permissions seeded (${allPermissions.length})`,
    `- first 50 enterprise objects seeded (${objects.length})`,
    '- seed completed successfully'
  ].join('\n'));
}

main().then(() => prisma.$disconnect()).catch(async (error: unknown) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
