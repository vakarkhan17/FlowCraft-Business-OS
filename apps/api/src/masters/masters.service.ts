import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MastersService {
  constructor(private readonly prisma: PrismaService) {}

  items(companyId: string) {
    return this.prisma.item.findMany({ where: { companyId }, orderBy: { sku: 'asc' } });
  }

  createItem(companyId: string, data: any) {
    return this.prisma.item.create({ data: { ...data, companyId } });
  }

  suppliers(companyId: string) {
    return this.prisma.supplier.findMany({ where: { companyId }, orderBy: { name: 'asc' } });
  }

  createSupplier(companyId: string, data: any) {
    return this.prisma.supplier.create({ data: { ...data, companyId } });
  }

  customers(companyId: string) {
    return this.prisma.customer.findMany({ where: { companyId }, orderBy: { name: 'asc' } });
  }

  createCustomer(companyId: string, data: any) {
    return this.prisma.customer.create({ data: { ...data, companyId } });
  }
}
