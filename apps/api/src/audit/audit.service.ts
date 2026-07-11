import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';

export interface AuditEvent {
  tenantId: string;
  companyId?: string | null;
  branchId?: string | null;
  enterpriseObjectId?: string | null;
  recordId: string;
  recordDigitalDna?: string | null;
  action: string;
  oldValue?: Prisma.InputJsonValue;
  newValue?: Prisma.InputJsonValue;
  reason?: string;
  userId?: string | null;
  ipAddress?: string;
  userAgent?: string;
  traceId?: string;
  requestSource?: string;
}

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  record(event: AuditEvent) {
    return this.prisma.auditLog.create({
      data: {
        ...event,
        oldValue: event.oldValue ? this.sanitize(event.oldValue) : undefined,
        newValue: event.newValue ? this.sanitize(event.newValue) : undefined,
        traceId: event.traceId ?? randomUUID(),
        requestSource: event.requestSource ?? 'API'
      }
    });
  }

  private sanitize(value: Prisma.InputJsonValue): Prisma.InputJsonValue {
    const redacted = JSON.parse(JSON.stringify(value, (key, item: unknown) =>
      /password|token|secret|credential|private.?key/i.test(key) ? '[REDACTED]' : item
    )) as Prisma.InputJsonValue;
    return redacted;
  }
}
