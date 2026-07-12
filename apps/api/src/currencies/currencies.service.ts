import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DigitalDnaService } from '../digital-dna/digital-dna.service';
import { ListQueryDto } from '../common/list-query.dto';
import { CreateCurrencyDto, UpdateCurrencyDto } from './currency.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CurrenciesService {
  constructor(private readonly prisma: PrismaService, private readonly dna: DigitalDnaService) {}

  async list(query: ListQueryDto) {
    const where: Prisma.CurrencyWhereInput = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.search ? { OR: [
        { currencyCode: { contains: query.search, mode: 'insensitive' } },
        { currencyName: { contains: query.search, mode: 'insensitive' } }
      ] } : {})
    };
    const [data, total] = await this.prisma.$transaction([
      this.prisma.currency.findMany({ where, skip: (query.page - 1) * query.pageSize, take: query.pageSize, orderBy: { currencyCode: query.sortOrder } }),
      this.prisma.currency.count({ where })
    ]);
    return { data, meta: { page: query.page, pageSize: query.pageSize, total } };
  }

  async create(data: CreateCurrencyDto) {
    const currencyCode = data.currencyCode.toUpperCase();
    try {
      return await this.prisma.currency.create({ data: { ...data, currencyCode, digitalDna: this.dna.create('CUR', currencyCode) } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') throw new ConflictException('Currency code already exists');
      throw error;
    }
  }

  async get(id: string) {
    const record = await this.prisma.currency.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Currency not found');
    return record;
  }

  async update(id: string, data: UpdateCurrencyDto) {
    await this.get(id);
    return this.prisma.currency.update({ where: { id }, data });
  }

  async archive(id: string) {
    await this.get(id);
    return this.prisma.currency.update({ where: { id }, data: { isActive: false, status: 'ARCHIVED' } });
  }
}
