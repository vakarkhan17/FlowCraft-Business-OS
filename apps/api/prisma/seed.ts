import { PrismaClient, ModuleCode, Role, FieldType, TransactionKind } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('FlowCraft123!', 10);

  const client = await prisma.client.upsert({
    where: { code: 'FLOWCRAFT-DEMO' },
    update: {},
    create: {
      code: 'FLOWCRAFT-DEMO',
      name: 'FlowCraft Demo Group',
      settings: {
        create: [
          { key: 'dateFormat', value: 'DD-MMM-YYYY' },
          { key: 'timezone', value: 'Asia/Dubai' },
          { key: 'documentHistoryMode', value: 'immutable-links' }
        ]
      }
    }
  });

  const company = await prisma.company.upsert({
    where: { clientId_name: { clientId: client.id, name: 'FlowCraft Precision Manufacturing' } },
    update: {},
    create: {
      clientId: client.id,
      name: 'FlowCraft Precision Manufacturing',
      legalName: 'FlowCraft Precision Manufacturing LLC',
      taxNumber: 'TRN-100200300',
      baseCurrency: 'USD'
    }
  });

  const branch = await prisma.branch.upsert({
    where: { companyId_code: { companyId: company.id, code: 'DXB' } },
    update: {},
    create: {
      companyId: company.id,
      code: 'DXB',
      name: 'Dubai Manufacturing Plant',
      address: 'Industrial Area 4'
    }
  });

  await prisma.warehouse.upsert({
    where: { companyId_code: { companyId: company.id, code: 'MAIN' } },
    update: {},
    create: {
      companyId: company.id,
      branchId: branch.id,
      code: 'MAIN',
      name: 'Main Raw Material Warehouse'
    }
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@flowcraft.local' },
    update: { passwordHash },
    create: {
      clientId: client.id,
      companyId: company.id,
      branchId: branch.id,
      email: 'admin@flowcraft.local',
      name: 'FlowCraft Admin',
      passwordHash,
      roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.FINANCE, Role.PURCHASING, Role.SALES]
    }
  });

  await prisma.moduleSetting.createMany({
    data: Object.values(ModuleCode).map((module) => ({
      clientId: client.id,
      module,
      enabled: true,
      settings: { owner: module === ModuleCode.ACCOUNTING ? 'Finance' : 'Operations' }
    })),
    skipDuplicates: true
  });

  await prisma.customField.createMany({
    data: [
      {
        companyId: company.id,
        module: ModuleCode.PURCHASING,
        entityName: 'PURCHASE_ORDER',
        fieldKey: 'machineLine',
        label: 'Machine Line',
        fieldType: FieldType.SELECT,
        options: ['Line A', 'Line B', 'Line C'],
        sortOrder: 10
      },
      {
        companyId: company.id,
        module: ModuleCode.QUALITY,
        entityName: 'QC_INSPECTION',
        fieldKey: 'inspectionGauge',
        label: 'Inspection Gauge',
        fieldType: FieldType.TEXT,
        isRequired: true,
        sortOrder: 20
      }
    ],
    skipDuplicates: true
  });

  const purchaseWorkflow = await prisma.workflowDefinition.upsert({
    where: {
      companyId_module_name_version: {
        companyId: company.id,
        module: ModuleCode.PURCHASING,
        name: 'Standard Purchase Flow',
        version: 1
      }
    },
    update: {},
    create: {
      companyId: company.id,
      module: ModuleCode.PURCHASING,
      name: 'Standard Purchase Flow',
      description: 'Purchase Request to Payment with optional RFQ step'
    }
  });

  await prisma.workflowStep.createMany({
    data: [
      { workflowId: purchaseWorkflow.id, code: 'PR', name: 'Purchase Request', stepOrder: 1 },
      { workflowId: purchaseWorkflow.id, code: 'RFQ', name: 'RFQ', stepOrder: 2 },
      { workflowId: purchaseWorkflow.id, code: 'PO', name: 'Purchase Order', stepOrder: 3 },
      { workflowId: purchaseWorkflow.id, code: 'GRN', name: 'GRN', stepOrder: 4 },
      { workflowId: purchaseWorkflow.id, code: 'INV', name: 'Supplier Invoice', stepOrder: 5 },
      { workflowId: purchaseWorkflow.id, code: 'PAY', name: 'Payment', stepOrder: 6 }
    ],
    skipDuplicates: true
  });

  const steps = await prisma.workflowStep.findMany({ where: { workflowId: purchaseWorkflow.id } });
  const stepByCode = new Map(steps.map((step) => [step.code, step.id]));
  for (const [from, to, sortOrder] of [
    ['PR', 'RFQ', 1],
    ['RFQ', 'PO', 2],
    ['PO', 'GRN', 3],
    ['GRN', 'INV', 4],
    ['INV', 'PAY', 5]
  ] as const) {
    await prisma.workflowTransition.create({
      data: {
        workflowId: purchaseWorkflow.id,
        fromStepId: stepByCode.get(from),
        toStepId: stepByCode.get(to),
        sortOrder
      }
    }).catch(() => undefined);
  }

  await prisma.printLayoutTemplate.upsert({
    where: {
      companyId_documentType_name_version: {
        companyId: company.id,
        documentType: TransactionKind.PURCHASE_ORDER,
        name: 'Modern Purchase Order',
        version: 1
      }
    },
    update: {},
    create: {
      companyId: company.id,
      documentType: TransactionKind.PURCHASE_ORDER,
      name: 'Modern Purchase Order',
      isDefault: true,
      canvas: { size: 'A4', orientation: 'portrait', margin: 24 },
      sections: {
        create: [
          { sectionKey: 'header', label: 'Header', position: { x: 24, y: 24, w: 545, h: 96 }, content: { logo: true, title: 'Purchase Order' } },
          { sectionKey: 'lines', label: 'Item Table', position: { x: 24, y: 180, w: 545, h: 360 }, dataBinding: 'document.lines' },
          { sectionKey: 'signature', label: 'Signature Block', position: { x: 360, y: 700, w: 190, h: 70 }, content: { qr: true, signature: true } }
        ]
      }
    }
  });

  await prisma.reportDefinition.upsert({
    where: { companyId_name: { companyId: company.id, name: 'Monthly Purchase Summary' } },
    update: {},
    create: {
      companyId: company.id,
      module: ModuleCode.PURCHASING,
      name: 'Monthly Purchase Summary',
      baseEntity: 'transaction_documents',
      description: 'Purchase totals by status and month',
      fields: {
        create: [
          { fieldPath: 'documentNo', label: 'Document No', dataType: FieldType.TEXT, sortOrder: 1 },
          { fieldPath: 'status', label: 'Status', dataType: FieldType.TEXT, sortOrder: 2, grouping: true },
          { fieldPath: 'amount', label: 'Amount', dataType: FieldType.NUMBER, sortOrder: 3, aggregation: 'SUM' }
        ]
      },
      filters: {
        create: [
          { fieldPath: 'createdAt', operator: 'between', isRequired: true },
          { fieldPath: 'kind', operator: 'in', value: [TransactionKind.PURCHASE_ORDER, TransactionKind.GRN] }
        ]
      }
    }
  });

  const approvalRule = await prisma.approvalRule.create({
    data: {
      companyId: company.id,
      module: ModuleCode.PURCHASING,
      documentType: TransactionKind.PURCHASE_ORDER,
      name: 'PO Amount Approval',
      condition: { amountGte: 5000 },
      steps: {
        create: [
          { level: 1, role: Role.MANAGER, maxAmount: 25000 },
          { level: 2, role: Role.FINANCE, minAmount: 25000 }
        ]
      }
    }
  }).catch(async () => {
    const existing = await prisma.approvalRule.findFirstOrThrow({
      where: { companyId: company.id, name: 'PO Amount Approval' }
    });
    return existing;
  });

  await prisma.item.createMany({
    data: [
      { companyId: company.id, sku: 'RM-AL-6061', name: 'Aluminium 6061 Bar', itemType: 'RAW_MATERIAL', uom: 'KG', reorderLevel: 500, standardCost: 4.8 },
      { companyId: company.id, sku: 'FG-VALVE-100', name: 'Precision Valve Assembly', itemType: 'FINISHED_GOOD', uom: 'EA', reorderLevel: 50, standardCost: 42.5 }
    ],
    skipDuplicates: true
  });

  await prisma.supplier.createMany({
    data: [
      { companyId: company.id, code: 'SUP-001', name: 'Gulf Metals Supply', email: 'supply@example.com', paymentTerms: 'Net 30' }
    ],
    skipDuplicates: true
  });

  await prisma.customer.createMany({
    data: [
      { companyId: company.id, code: 'CUS-001', name: 'Apex Industrial Systems', email: 'buying@example.com', creditLimit: 150000 }
    ],
    skipDuplicates: true
  });

  const pr = await prisma.transactionDocument.upsert({
    where: { companyId_documentNo: { companyId: company.id, documentNo: 'PR-2026-00001' } },
    update: {},
    create: {
      companyId: company.id,
      module: ModuleCode.PURCHASING,
      kind: TransactionKind.PURCHASE_REQUEST,
      documentNo: 'PR-2026-00001',
      status: 'APPROVED',
      amount: 12500,
      createdById: admin.id,
      payload: { department: 'Production', purpose: 'Raw material replenishment' }
    }
  });

  const po = await prisma.transactionDocument.upsert({
    where: { companyId_documentNo: { companyId: company.id, documentNo: 'PO-2026-00001' } },
    update: {},
    create: {
      companyId: company.id,
      module: ModuleCode.PURCHASING,
      kind: TransactionKind.PURCHASE_ORDER,
      documentNo: 'PO-2026-00001',
      status: 'PENDING_APPROVAL',
      amount: 12500,
      createdById: admin.id,
      payload: { supplier: 'Gulf Metals Supply', lines: [{ sku: 'RM-AL-6061', qty: 2500, rate: 5 }] }
    }
  });

  await prisma.transactionLink.upsert({
    where: { parentId_childId_relationType: { parentId: pr.id, childId: po.id, relationType: 'CONVERTED_TO' } },
    update: {},
    create: { parentId: pr.id, childId: po.id, relationType: 'CONVERTED_TO' }
  });

  await prisma.approvalRequest.create({
    data: {
      ruleId: approvalRule.id,
      documentId: po.id,
      status: 'PENDING',
      currentLevel: 1
    }
  }).catch(() => undefined);

  const accounts = await Promise.all([
    upsertAccount(company.id, '1000', 'Cash and Bank', 'ASSET'),
    upsertAccount(company.id, '1200', 'Accounts Receivable', 'ASSET'),
    upsertAccount(company.id, '2000', 'Accounts Payable', 'LIABILITY'),
    upsertAccount(company.id, '4000', 'Sales Revenue', 'INCOME'),
    upsertAccount(company.id, '5000', 'Cost of Goods Sold', 'EXPENSE')
  ]);

  const sales = accounts.find((account) => account.code === '4000')!;
  const receivable = accounts.find((account) => account.code === '1200')!;
  await prisma.journalEntry.upsert({
    where: { companyId_entryNo: { companyId: company.id, entryNo: 'JE-2026-00001' } },
    update: {},
    create: {
      companyId: company.id,
      entryNo: 'JE-2026-00001',
      postingDate: new Date('2026-07-01T00:00:00.000Z'),
      memo: 'Opening demo sales invoice',
      lines: {
        create: [
          { accountId: receivable.id, debit: 62500, credit: 0, costCenter: 'Production' },
          { accountId: sales.id, debit: 0, credit: 62500, costCenter: 'Production' }
        ]
      }
    }
  });
}

async function upsertAccount(companyId: string, code: string, name: string, accountType: string) {
  return prisma.chartOfAccount.upsert({
    where: { companyId_code: { companyId, code } },
    update: {},
    create: { companyId, code, name, accountType }
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
