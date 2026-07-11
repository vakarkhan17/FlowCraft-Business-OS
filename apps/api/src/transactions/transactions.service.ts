import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  list(companyId: string, kind?: any) {
    return this.prisma.transactionDocument.findMany({
      where: { companyId, ...(kind ? { kind } : {}) },
      include: { parentLinks: true, childLinks: true, approvalRequests: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  create(companyId: string, userId: string, data: any) {
    return this.prisma.transactionDocument.create({
      data: {
        companyId,
        module: data.module,
        kind: data.kind,
        documentNo: data.documentNo,
        status: data.status ?? 'DRAFT',
        amount: data.amount ?? 0,
        currency: data.currency ?? 'USD',
        payload: data.payload ?? {},
        createdById: userId
      }
    });
  }

  link(data: { parentId: string; childId: string; relationType?: string }) {
    return this.prisma.transactionLink.upsert({
      where: {
        parentId_childId_relationType: {
          parentId: data.parentId,
          childId: data.childId,
          relationType: data.relationType ?? 'NEXT_STEP'
        }
      },
      update: {},
      create: {
        parentId: data.parentId,
        childId: data.childId,
        relationType: data.relationType ?? 'NEXT_STEP'
      }
    });
  }
}
