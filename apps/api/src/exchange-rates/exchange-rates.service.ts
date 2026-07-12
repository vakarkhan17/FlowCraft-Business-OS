import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ListQueryDto } from '../common/list-query.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExchangeRateDto } from './exchange-rate.dto';

@Injectable()
export class ExchangeRatesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(tenantId: string, query: ListQueryDto) {
    const where: Prisma.ExchangeRateWhereInput = { tenantId, ...(query.status ? { status: query.status } : {}) };
    const [data, total] = await this.prisma.$transaction([
      this.prisma.exchangeRate.findMany({ where, include: { fromCurrency: true, toCurrency: true }, skip: (query.page - 1) * query.pageSize, take: query.pageSize, orderBy: { rateDate: 'desc' } }),
      this.prisma.exchangeRate.count({ where })
    ]);
    return { data, meta: { page: query.page, pageSize: query.pageSize, total } };
  }

  async create(tenantId: string, data: CreateExchangeRateDto) {
    if (data.fromCurrencyId === data.toCurrencyId) throw new BadRequestException('From and to currencies must differ');
    const previous = data.replacesExchangeRateId
      ? await this.prisma.exchangeRate.findFirst({ where: { id: data.replacesExchangeRateId, tenantId } })
      : null;
    if (data.replacesExchangeRateId && !previous) throw new NotFoundException('Replacement source rate not found');
    const version = previous ? previous.version + 1 : 1;
    try {
      return await this.prisma.$transaction(async (tx) => {
        if (previous) await tx.exchangeRate.update({ where: { id: previous.id }, data: { status: 'REPLACED' } });
        return tx.exchangeRate.create({ data: {
          tenantId,
          fromCurrencyId: data.fromCurrencyId,
          toCurrencyId: data.toCurrencyId,
          rate: new Prisma.Decimal(data.rate),
          rateDate: new Date(data.rateDate),
          rateType: data.rateType,
          source: data.source,
          replacesExchangeRateId: data.replacesExchangeRateId,
          version
        }, include: { fromCurrency: true, toCurrency: true } });
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') throw new ConflictException('Exchange-rate version already exists');
      throw error;
    }
  }

  async get(tenantId: string, id: string) {
    const record = await this.prisma.exchangeRate.findFirst({ where: { id, tenantId }, include: { fromCurrency: true, toCurrency: true } });
    if (!record) throw new NotFoundException('Exchange rate not found');
    return record;
  }
}
