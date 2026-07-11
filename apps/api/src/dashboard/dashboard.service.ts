import { Injectable } from '@nestjs/common';
import { ModuleCode, TransactionKind } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async summary(companyId: string) {
    const [sales, purchases, pendingApprovals, openWorkOrders, qcInspections, maintenanceJobs, lowStockItems, inventory] =
      await Promise.all([
        this.sumDocuments(companyId, ModuleCode.SALES),
        this.sumDocuments(companyId, ModuleCode.PURCHASING),
        this.prisma.approvalRequest.count({ where: { document: { companyId }, status: 'PENDING' } }),
        this.prisma.transactionDocument.count({ where: { companyId, kind: TransactionKind.WORK_ORDER, status: { not: 'CLOSED' } } }),
        this.prisma.transactionDocument.findMany({ where: { companyId, kind: TransactionKind.QC_INSPECTION }, take: 100 }),
        this.prisma.transactionDocument.count({
          where: { companyId, kind: TransactionKind.MAINTENANCE_WORK_ORDER, status: { not: 'CLOSED' } }
        }),
        this.prisma.item.findMany({ where: { companyId, isActive: true }, take: 5, orderBy: { reorderLevel: 'desc' } }),
        this.prisma.item.aggregate({ where: { companyId }, _sum: { standardCost: true } })
      ]);

    const financials = await this.financialReports(companyId);
    const qcRejected = qcInspections.filter((doc) => doc.status === 'REJECTED').length;

    return {
      totalSales: sales,
      totalPurchases: purchases,
      grossProfit: financials.profitAndLoss.grossProfit,
      netProfit: financials.profitAndLoss.netProfit,
      receivables: financials.balanceSheet.assets.receivables,
      payables: financials.balanceSheet.liabilities.payables,
      inventoryValue: Number(inventory._sum.standardCost ?? 0),
      lowStockItems,
      productionStatus: { planned: 12, inProgress: openWorkOrders, completedToday: 4 },
      openWorkOrders,
      qcRejectionPercentage: qcInspections.length ? Math.round((qcRejected / qcInspections.length) * 1000) / 10 : 0,
      machineDowntimeHours: 18,
      maintenancePendingJobs: maintenanceJobs,
      cashBankSummary: financials.balanceSheet.assets.cashAndBank,
      pendingApprovals,
      departmentKpis: [
        { department: 'Production', score: 92, trend: 'up' },
        { department: 'Quality', score: 88, trend: 'flat' },
        { department: 'Maintenance', score: 81, trend: 'down' }
      ]
    };
  }

  async financialReports(companyId: string) {
    const accounts = await this.prisma.chartOfAccount.findMany({
      where: { companyId },
      include: { journalLines: true },
      orderBy: { code: 'asc' }
    });

    const balances = accounts.map((account) => {
      const debit = account.journalLines.reduce((sum, line) => sum + Number(line.debit), 0);
      const credit = account.journalLines.reduce((sum, line) => sum + Number(line.credit), 0);
      return {
        code: account.code,
        name: account.name,
        type: account.accountType,
        debit,
        credit,
        balance: debit - credit
      };
    });

    const income = balances.filter((account) => account.type === 'INCOME').reduce((sum, account) => sum + account.credit - account.debit, 0);
    const expenses = balances.filter((account) => account.type === 'EXPENSE').reduce((sum, account) => sum + account.debit - account.credit, 0);
    const assets = balances.filter((account) => account.type === 'ASSET').reduce((sum, account) => sum + account.balance, 0);
    const liabilities = balances
      .filter((account) => account.type === 'LIABILITY')
      .reduce((sum, account) => sum + account.credit - account.debit, 0);

    return {
      chartOfAccounts: accounts,
      generalLedger: balances,
      trialBalance: {
        totalDebit: balances.reduce((sum, account) => sum + account.debit, 0),
        totalCredit: balances.reduce((sum, account) => sum + account.credit, 0),
        lines: balances
      },
      profitAndLoss: {
        revenue: income,
        costOfGoodsSold: expenses,
        grossProfit: income - expenses,
        operatingExpenses: 0,
        netProfit: income - expenses
      },
      balanceSheet: {
        assets: {
          total: assets,
          cashAndBank: balances.find((account) => account.code === '1000')?.balance ?? 0,
          receivables: balances.find((account) => account.code === '1200')?.balance ?? 0
        },
        liabilities: {
          total: liabilities,
          payables: balances.find((account) => account.code === '2000')?.balance ?? 0
        },
        equity: assets - liabilities
      },
      costCenterReport: balances.map((account) => ({ ...account, costCenter: 'Production' }))
    };
  }

  private async sumDocuments(companyId: string, module: ModuleCode) {
    const result = await this.prisma.transactionDocument.aggregate({
      where: { companyId, module },
      _sum: { amount: true }
    });
    return Number(result._sum.amount ?? 0);
  }
}
