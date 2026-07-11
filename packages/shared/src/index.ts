export const erpModules = [
  'ACCOUNTING',
  'PURCHASING',
  'SALES',
  'WAREHOUSE',
  'MRP',
  'PRODUCTION',
  'QUALITY',
  'COSTING',
  'MAINTENANCE',
  'APPROVALS',
  'REPORTS',
  'PRINT_LAYOUTS',
  'DASHBOARD',
  'SETTINGS'
] as const;

export const manufacturingFlows = {
  purchase: ['Purchase Request', 'RFQ', 'Supplier Quotation', 'Purchase Order', 'GRN', 'Supplier Invoice', 'Payment'],
  sales: ['Sales Inquiry', 'Sales Quotation', 'Sales Order', 'Delivery Note', 'Sales Invoice', 'Receipt'],
  production: ['BOM', 'Work Order', 'Material Issue', 'Production Entry', 'QC Inspection', 'Finished Goods Receipt'],
  maintenance: ['Maintenance Request', 'Maintenance Work Order', 'Spare Parts Issue', 'Completion Report']
} as const;

export type ErpModule = (typeof erpModules)[number];
