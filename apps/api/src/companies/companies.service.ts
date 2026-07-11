import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  listCompanies(clientId: string) {
    return this.prisma.company.findMany({
      where: { clientId },
      include: { branches: true, warehouses: true },
      orderBy: { name: 'asc' }
    });
  }

  createCompany(clientId: string, data: { name: string; legalName?: string; baseCurrency?: string }) {
    return this.prisma.company.create({
      data: {
        clientId,
        name: data.name,
        legalName: data.legalName,
        baseCurrency: data.baseCurrency ?? 'USD'
      }
    });
  }

  listBranches(companyId: string) {
    return this.prisma.branch.findMany({ where: { companyId }, orderBy: { name: 'asc' } });
  }

  createBranch(companyId: string, data: { code: string; name: string; address?: string }) {
    return this.prisma.branch.create({ data: { companyId, ...data } });
  }

  listWarehouses(companyId: string) {
    return this.prisma.warehouse.findMany({ where: { companyId }, orderBy: { name: 'asc' } });
  }

  createWarehouse(companyId: string, data: { branchId?: string; code: string; name: string }) {
    return this.prisma.warehouse.create({ data: { companyId, ...data } });
  }
}
