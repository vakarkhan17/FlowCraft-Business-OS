import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ListQueryDto } from '../common/list-query.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnterpriseObjectDto, CreateObjectFieldDto, CreateObjectRelationshipDto, UpdateEnterpriseObjectDto } from './enterprise-object.dto';

@Injectable()
export class EnterpriseObjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: ListQueryDto) {
    const where: Prisma.EnterpriseObjectWhereInput = { ...(query.status ? { status: query.status } : {}), ...(query.search ? { OR: [
      { objectCode: { contains: query.search, mode: 'insensitive' } }, { objectName: { contains: query.search, mode: 'insensitive' } }, { objectFamily: { contains: query.search, mode: 'insensitive' } }
    ] } : {}) };
    const [data, total] = await this.prisma.$transaction([
      this.prisma.enterpriseObject.findMany({ where, include: { _count: { select: { fields: true, sourceRelationships: true } } }, skip: (query.page - 1) * query.pageSize, take: query.pageSize, orderBy: { objectCode: query.sortOrder } }),
      this.prisma.enterpriseObject.count({ where })
    ]);
    return { data, meta: { page: query.page, pageSize: query.pageSize, total } };
  }

  async create(data: CreateEnterpriseObjectDto) {
    try { return await this.prisma.enterpriseObject.create({ data: { ...data, objectCode: data.objectCode.toUpperCase() } }); }
    catch (error) { if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') throw new ConflictException('Object code already exists'); throw error; }
  }

  async get(id: string) {
    const record = await this.prisma.enterpriseObject.findUnique({ where: { id }, include: { fields: { orderBy: { displayOrder: 'asc' } }, sourceRelationships: { include: { targetObject: true } }, targetRelationships: { include: { sourceObject: true } } } });
    if (!record) throw new NotFoundException('Enterprise object not found');
    return record;
  }

  async update(id: string, data: UpdateEnterpriseObjectDto) { await this.get(id); return this.prisma.enterpriseObject.update({ where: { id }, data }); }
  fields(id: string) { return this.prisma.objectField.findMany({ where: { enterpriseObjectId: id }, orderBy: { displayOrder: 'asc' } }); }
  async createField(id: string, data: CreateObjectFieldDto) { await this.get(id); return this.prisma.objectField.create({ data: { ...data, enterpriseObjectId: id, defaultValue: data.defaultValue as Prisma.InputJsonValue | undefined, validationRule: data.validationRule as Prisma.InputJsonValue | undefined } }); }
  relationships(id: string) { return this.prisma.objectRelationship.findMany({ where: { sourceObjectId: id }, include: { targetObject: true }, orderBy: { relationshipName: 'asc' } }); }
  async createRelationship(id: string, data: CreateObjectRelationshipDto) { await Promise.all([this.get(id), this.get(data.targetObjectId)]); return this.prisma.objectRelationship.create({ data: { ...data, sourceObjectId: id } }); }
}
