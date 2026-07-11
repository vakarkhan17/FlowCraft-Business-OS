import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LayoutsService {
  constructor(private readonly prisma: PrismaService) {}

  list(companyId: string) {
    return this.prisma.printLayoutTemplate.findMany({
      where: { companyId },
      include: { sections: true },
      orderBy: [{ documentType: 'asc' }, { name: 'asc' }]
    });
  }

  save(companyId: string, data: any) {
    return this.prisma.printLayoutTemplate.create({
      data: {
        companyId,
        documentType: data.documentType,
        name: data.name,
        version: data.version ?? 1,
        isDefault: data.isDefault ?? false,
        canvas: data.canvas ?? {},
        sections: {
          create: (data.sections ?? []).map((section: any) => ({
            sectionKey: section.sectionKey,
            label: section.label,
            position: section.position ?? {},
            style: section.style ?? {},
            dataBinding: section.dataBinding,
            content: section.content ?? {}
          }))
        }
      },
      include: { sections: true }
    });
  }
}
