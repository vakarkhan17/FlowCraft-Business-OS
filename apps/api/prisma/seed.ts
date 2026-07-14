import { ModuleCode, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const roles = [
  ['SUPER_ADMIN', 'Super Admin'], ['SYSTEM_ADMINISTRATOR', 'System Administrator'], ['CEO', 'CEO'],
  ['FINANCE_MANAGER', 'Finance Manager'], ['PURCHASE_MANAGER', 'Purchase Manager'], ['SALES_MANAGER', 'Sales Manager'],
  ['PRODUCTION_MANAGER', 'Production Manager'], ['PLANNING_MANAGER', 'Planning Manager'], ['WAREHOUSE_MANAGER', 'Warehouse Manager'],
  ['QUALITY_MANAGER', 'Quality Manager'], ['MAINTENANCE_MANAGER', 'Maintenance Manager'], ['ENGINEERING_MANAGER', 'Engineering Manager'],
  ['AUDITOR', 'Auditor'], ['STANDARD_USER', 'Standard User']
] as const;

const objectRegister = [
  ['TENANT', 'Tenant', 'PLATFORM'], ['CURRENCY', 'Currency', 'FINANCE'], ['EXCHANGE_RATE', 'Exchange Rate', 'FINANCE'],
  ['COMPANY', 'Company', 'ORGANIZATION'], ['BRANCH', 'Branch', 'ORGANIZATION'], ['WAREHOUSE', 'Warehouse', 'WAREHOUSE'],
  ['USER', 'User', 'SECURITY'], ['ROLE', 'Role', 'SECURITY'], ['PERMISSION', 'Permission', 'SECURITY'],
  ['ENTERPRISE_OBJECT', 'Enterprise Object', 'PLATFORM'], ['OBJECT_FIELD', 'Object Field', 'PLATFORM'], ['OBJECT_RELATIONSHIP', 'Object Relationship', 'PLATFORM'],
  ['WORKFLOW_DEFINITION', 'Workflow Definition', 'WORKFLOW'], ['NUMBER_SERIES', 'Number Series', 'PLATFORM'], ['AUDIT_LOG', 'Audit Log', 'SECURITY'],
  ['ITEM', 'Item', 'INVENTORY'], ['ITEM_CATEGORY', 'Item Category', 'INVENTORY'], ['UNIT_OF_MEASURE', 'Unit of Measure', 'INVENTORY'],
  ['SUPPLIER', 'Supplier', 'PURCHASING'], ['CUSTOMER', 'Customer', 'SALES'], ['PURCHASE_REQUEST', 'Purchase Request', 'PURCHASING'],
  ['REQUEST_FOR_QUOTATION', 'Request for Quotation', 'PURCHASING'], ['SUPPLIER_QUOTATION', 'Supplier Quotation', 'PURCHASING'],
  ['PURCHASE_ORDER', 'Purchase Order', 'PURCHASING'], ['GOODS_RECEIPT', 'Goods Receipt', 'PURCHASING'], ['SUPPLIER_INVOICE', 'Supplier Invoice', 'FINANCE'],
  ['PAYMENT', 'Payment', 'FINANCE'], ['SALES_INQUIRY', 'Sales Inquiry', 'SALES'], ['SALES_QUOTATION', 'Sales Quotation', 'SALES'],
  ['SALES_ORDER', 'Sales Order', 'SALES'], ['DELIVERY_NOTE', 'Delivery Note', 'SALES'], ['SALES_INVOICE', 'Sales Invoice', 'FINANCE'],
  ['RECEIPT', 'Receipt', 'FINANCE'], ['BILL_OF_MATERIALS', 'Bill of Materials', 'MANUFACTURING'], ['ROUTING', 'Routing', 'MANUFACTURING'],
  ['WORK_CENTER', 'Work Center', 'MANUFACTURING'], ['PRODUCTION_PLAN', 'Production Plan', 'MANUFACTURING'], ['WORK_ORDER', 'Work Order', 'MANUFACTURING'],
  ['MATERIAL_ISSUE', 'Material Issue', 'MANUFACTURING'], ['PRODUCTION_ENTRY', 'Production Entry', 'MANUFACTURING'], ['QUALITY_INSPECTION', 'Quality Inspection', 'QUALITY'],
  ['FINISHED_GOODS_RECEIPT', 'Finished Goods Receipt', 'WAREHOUSE'], ['STOCK_TRANSFER', 'Stock Transfer', 'WAREHOUSE'], ['STOCK_ADJUSTMENT', 'Stock Adjustment', 'WAREHOUSE'],
  ['MAINTENANCE_REQUEST', 'Maintenance Request', 'MAINTENANCE'], ['MAINTENANCE_WORK_ORDER', 'Maintenance Work Order', 'MAINTENANCE'],
  ['ASSET', 'Asset', 'MAINTENANCE'], ['CHART_OF_ACCOUNT', 'Chart of Account', 'FINANCE'], ['JOURNAL_ENTRY', 'Journal Entry', 'FINANCE'],
  ['FISCAL_YEAR', 'Fiscal Year', 'FINANCE']
] as const;

const actions = ['VIEW', 'CREATE', 'EDIT', 'ARCHIVE', 'APPROVE', 'REJECT', 'SUBMIT', 'CANCEL', 'IMPORT', 'EXPORT', 'CONFIGURE'] as const;

const dba003ObjectRegister = [
  ['ENTERPRISE_GROUP', 'Enterprise Group'], ['LEGAL_ENTITY', 'Legal Entity'], ['PLANT', 'Plant'],
  ['BUSINESS_UNIT', 'Business Unit'], ['DIVISION', 'Division'], ['DEPARTMENT', 'Department'],
  ['SECTION', 'Section'], ['TEAM', 'Team'], ['LOCATION', 'Location'], ['COST_CENTER', 'Cost Center'],
  ['PROFIT_CENTER', 'Profit Center'], ['ORGANIZATION_NODE', 'Organization Node'],
  ['ORGANIZATION_RELATIONSHIP_HISTORY', 'Organization Relationship History'],
  ['ORGANIZATION_INHERITANCE_POLICY', 'Organization Inheritance Policy'],
  ['ORGANIZATION_SETTING_OVERRIDE', 'Organization Setting Override'],
  ['USER_ORGANIZATION_ACCESS', 'User Organization Access']
] as const;

const dba004ObjectRegister = [
  ['MASTER_DATA', 'Master Data'], ['COUNTRY', 'Country'], ['STATE', 'State'], ['CITY', 'City'], ['TERRITORY', 'Territory'],
  ['ADDRESS', 'Address'], ['CONTACT_PERSON', 'Contact Person'], ['UOM_CONVERSION', 'UOM Conversion'], ['ITEM_GROUP', 'Item Group'],
  ['ITEM_ATTRIBUTE_DEFINITION', 'Item Attribute Definition'], ['ITEM_ATTRIBUTE_VALUE', 'Item Attribute Value'], ['BRAND', 'Brand'],
  ['MANUFACTURER', 'Manufacturer'], ['WAREHOUSE_ZONE', 'Warehouse Zone'], ['BIN', 'Bin'], ['STOCK_STATUS', 'Stock Status'],
  ['BATCH', 'Batch'], ['SERIAL_NUMBER', 'Serial Number'], ['BUSINESS_PARTNER', 'Business Partner'], ['CUSTOMER_GROUP', 'Customer Group'],
  ['SUPPLIER_GROUP', 'Supplier Group'], ['BUSINESS_PARTNER_ADDRESS', 'Business Partner Address'], ['BUSINESS_PARTNER_CONTACT', 'Business Partner Contact'],
  ['PAYMENT_TERM', 'Payment Term'], ['CREDIT_TERM', 'Credit Term'], ['CREDIT_PROFILE', 'Credit Profile'], ['DELIVERY_TERM', 'Delivery Term'],
  ['INCOTERM', 'Incoterm'], ['PRICE_LIST', 'Price List'], ['TAX_CATEGORY', 'Tax Category'], ['TAX_CODE', 'Tax Code'],
  ['MASTER_DATA_CHANGE_REQUEST', 'Master Data Change Request'], ['DUPLICATE_DETECTION_RULE', 'Duplicate Detection Rule'],
  ['MASTER_DATA_MERGE_HISTORY', 'Master Data Merge History'], ['MASTER_IMPORT_MAPPING', 'Master Import Mapping'],
  ['MASTER_IMPORT_JOB', 'Master Import Job'], ['MASTER_IMPORT_ROW', 'Master Import Row'], ['MASTER_EXPORT_JOB', 'Master Export Job']
] as const;

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { tenantCode: 'FLOWCRAFT-DEMO' },
    update: { tenantName: 'FlowCraft Demo Tenant', isActive: true, status: 'ACTIVE' },
    create: { tenantCode: 'FLOWCRAFT-DEMO', tenantName: 'FlowCraft Demo Tenant', subscriptionPlan: 'DEVELOPMENT' }
  });

  const currencies = await Promise.all([
    ['AED', 'UAE Dirham', 'د.إ', 2], ['USD', 'US Dollar', '$', 2], ['EUR', 'Euro', '€', 2], ['INR', 'Indian Rupee', '₹', 2]
  ].map(([code, name, symbol, decimalPlaces]) => prisma.currency.upsert({
    where: { currencyCode: String(code) }, update: {},
    create: { digitalDna: `FC-CUR-${code}`, currencyCode: String(code), currencyName: String(name), symbol: String(symbol), decimalPlaces: Number(decimalPlaces) }
  })));
  const aed = currencies.find((currency) => currency.currencyCode === 'AED')!;

  const company = await prisma.company.upsert({
    where: { tenantId_companyCode: { tenantId: tenant.id, companyCode: 'FCMFG' } },
    update: {},
    create: { tenantId: tenant.id, digitalDna: 'FC-CMP-UAE-000001', companyCode: 'FCMFG', companyName: 'FlowCraft Manufacturing Demo', legalName: 'FlowCraft Manufacturing Demo LLC', baseCurrencyId: aed.id, countryCode: 'UAE' }
  });
  const branch = await prisma.branch.upsert({
    where: { companyId_branchCode: { companyId: company.id, branchCode: 'HO' } },
    update: {},
    create: { tenantId: tenant.id, companyId: company.id, digitalDna: 'FC-BRN-FCMFG-000001', branchCode: 'HO', branchName: 'Head Office', branchType: 'HEAD_OFFICE', countryCode: 'UAE' }
  });

  await prisma.warehouse.upsert({ where: { companyId_code: { companyId: company.id, code: 'MAIN' } }, update: { tenantId: tenant.id }, create: { tenantId: tenant.id, companyId: company.id, branchId: branch.id, digitalDna: 'FC-WHS-MAIN-000001', code: 'MAIN', name: 'Main Warehouse', warehouseType: 'GENERAL' } });
  await prisma.moduleSetting.createMany({ data: Object.values(ModuleCode).map((module) => ({ clientId: tenant.id, module, enabled: true, settings: {} })), skipDuplicates: true });

  const roleRecords = await Promise.all(roles.map(([roleCode, roleName]) => prisma.accessRole.upsert({
    where: { tenantId_roleCode: { tenantId: tenant.id, roleCode } }, update: { roleName, isActive: true },
    create: { tenantId: tenant.id, roleCode, roleName, roleType: roleCode === 'SUPER_ADMIN' ? 'SYSTEM' : 'STANDARD' }
  })));

  const objects = await Promise.all(objectRegister.map(([objectCode, objectName, ownerModule]) => prisma.enterpriseObject.upsert({
    where: { objectCode }, update: { objectName, ownerModule },
    create: { objectCode, objectName, objectType: objectCode.includes('ORDER') || objectCode.includes('INVOICE') || objectCode.includes('ENTRY') ? 'TRANSACTION' : 'MASTER', objectCategory: ownerModule, objectFamily: ownerModule, ownerModule, framework: 'FEOM-002', tableName: objectCode.toLowerCase(), apiPath: `/api/v1/${objectCode.toLowerCase().replaceAll('_', '-')}`, supportsWorkflow: ['PURCHASE_ORDER', 'SALES_ORDER', 'WORK_ORDER'].includes(objectCode), supportsCustomFields: true, supportsImport: true, supportsExport: true, supportsPrint: true }
  })));

  const dba003Objects = await Promise.all(dba003ObjectRegister.map(([objectCode, objectName]) => prisma.enterpriseObject.upsert({
    where: { objectCode },
    update: { objectName, ownerModule: 'ORGANIZATION', framework: 'DBA-003' },
    create: { objectCode, objectName, objectType: 'MASTER', objectCategory: 'ORGANIZATION', objectFamily: 'ENTERPRISE_STRUCTURE', ownerModule: 'ORGANIZATION', framework: 'DBA-003', tableName: `${objectCode.toLowerCase()}s`, apiPath: `/api/v1/organization/${objectCode.toLowerCase().replaceAll('_', '-')}`, supportsWorkflow: true, supportsAudit: true, supportsImport: true, supportsExport: true, supportsReports: true, supportsAi: true }
  })));

  const dba004Objects = await Promise.all(dba004ObjectRegister.map(([objectCode, objectName]) => prisma.enterpriseObject.upsert({
    where: { objectCode },
    update: { objectName, ownerModule: 'MASTER_DATA' },
    create: { objectCode, objectName, objectType: 'MASTER', objectCategory: 'MASTER_DATA', objectFamily: 'ENTERPRISE_MASTER_DATA', ownerModule: 'MASTER_DATA', framework: 'DBA-004', tableName: `${objectCode.toLowerCase()}s`, apiPath: `/api/v1/master-data/${objectCode.toLowerCase().replaceAll('_', '-')}`, supportsWorkflow: true, supportsAudit: true, supportsCustomFields: true, supportsImport: true, supportsExport: true, supportsReports: true, supportsAi: true }
  })));

  await prisma.permission.createMany({ data: [...objects, ...dba003Objects, ...dba004Objects].flatMap((object) => actions.map((action) => ({ permissionCode: `${object.objectCode}.${action}`, permissionName: `${action} ${object.objectName}`, enterpriseObjectId: object.id, action: action.toLowerCase(), description: `${action} access for ${object.objectName}` }))), skipDuplicates: true });
  const allPermissions = await prisma.permission.findMany({ select: { id: true } });
  const superAdminRole = roleRecords.find((role) => role.roleCode === 'SUPER_ADMIN')!;
  await prisma.rolePermission.createMany({ data: allPermissions.map((permission) => ({ tenantId: tenant.id, roleId: superAdminRole.id, permissionId: permission.id, allowed: true })), skipDuplicates: true });

  const email = (process.env.SEED_ADMIN_EMAIL ?? 'admin@flowcraft.local').toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'FlowCraft123!';
  const admin = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email } },
    update: { passwordHash: await bcrypt.hash(password, 12), isActive: true, isDeleted: false, status: 'ACTIVE' },
    create: { tenantId: tenant.id, digitalDna: 'FC-USR-FLOWCRAFTDEMO-000001', username: 'admin', email, passwordHash: await bcrypt.hash(password, 12), fullName: 'FlowCraft Administrator', defaultCompanyId: company.id, defaultBranchId: branch.id }
  });
  await prisma.companyAccess.upsert({ where: { tenantId_userId_companyId: { tenantId: tenant.id, userId: admin.id, companyId: company.id } }, update: {}, create: { tenantId: tenant.id, userId: admin.id, companyId: company.id } });
  await prisma.branchAccess.upsert({ where: { tenantId_userId_branchId: { tenantId: tenant.id, userId: admin.id, branchId: branch.id } }, update: {}, create: { tenantId: tenant.id, userId: admin.id, companyId: company.id, branchId: branch.id } });
  const existingAssignment = await prisma.userRole.findFirst({ where: { tenantId: tenant.id, userId: admin.id, roleId: superAdminRole.id, companyId: company.id, branchId: branch.id } });
  if (!existingAssignment) await prisma.userRole.create({ data: { tenantId: tenant.id, userId: admin.id, roleId: superAdminRole.id, companyId: company.id, branchId: branch.id } });

  const effectiveFrom = new Date('2026-07-12T00:00:00.000Z');
  const enterpriseGroup = await prisma.enterpriseGroup.upsert({
    where: { tenantId_groupCode: { tenantId: tenant.id, groupCode: 'FCGROUP' } }, update: {},
    create: { tenantId: tenant.id, digitalDna: 'FC-GRP-FCGROUP-000001', groupCode: 'FCGROUP', groupName: 'FlowCraft Demo Group', legalName: 'FlowCraft Demo Group', baseCurrencyId: aed.id, countryCode: 'UAE', effectiveFrom, createdById: admin.id, updatedById: admin.id }
  });
  const legalEntity = await prisma.legalEntity.upsert({
    where: { tenantId_legalEntityCode: { tenantId: tenant.id, legalEntityCode: 'FCMFG-LE' } }, update: {},
    create: { tenantId: tenant.id, enterpriseGroupId: enterpriseGroup.id, digitalDna: 'FC-LEN-FCMFGLE-000001', legalEntityCode: 'FCMFG-LE', legalEntityName: 'FlowCraft Manufacturing Demo LLC', legalName: 'FlowCraft Manufacturing Demo LLC', countryCode: 'UAE', baseCurrencyId: aed.id, effectiveFrom, createdById: admin.id, updatedById: admin.id }
  });
  await prisma.company.update({ where: { id: company.id }, data: { enterpriseGroupId: enterpriseGroup.id, legalEntityId: legalEntity.id, companyType: 'MANUFACTURING', timezone: 'Asia/Dubai', locale: 'en-AE', effectiveFrom } });
  const plant = await prisma.plant.upsert({
    where: { companyId_plantCode: { companyId: company.id, plantCode: 'DXB-PLANT' } }, update: {},
    create: { tenantId: tenant.id, companyId: company.id, branchId: branch.id, legalEntityId: legalEntity.id, digitalDna: 'FC-PLT-DXBPLANT-000001', plantCode: 'DXB-PLANT', plantName: 'Dubai Plant', plantType: 'MANUFACTURING', countryCode: 'UAE', city: 'Dubai', timezone: 'Asia/Dubai', effectiveFrom, createdById: admin.id, updatedById: admin.id }
  });
  const businessUnit = await prisma.businessUnit.upsert({ where: { companyId_businessUnitCode: { companyId: company.id, businessUnitCode: 'OPS' } }, update: {}, create: { tenantId: tenant.id, companyId: company.id, digitalDna: 'FC-BUN-OPS-000001', businessUnitCode: 'OPS', businessUnitName: 'Operations Business Unit', effectiveFrom } });
  const division = await prisma.division.upsert({ where: { companyId_divisionCode: { companyId: company.id, divisionCode: 'MFG' } }, update: {}, create: { tenantId: tenant.id, companyId: company.id, businessUnitId: businessUnit.id, digitalDna: 'FC-DIV-MFG-000001', divisionCode: 'MFG', divisionName: 'Manufacturing Division', effectiveFrom } });

  const departmentSeeds = [
    ['PROD', 'Production Department', 'PRODUCTION'], ['FIN', 'Finance Department', 'FINANCE'],
    ['PUR', 'Purchase Department', 'PURCHASING'], ['SAL', 'Sales Department', 'SALES'],
    ['WHS', 'Warehouse Department', 'WAREHOUSE'], ['QUA', 'Quality Department', 'QUALITY'],
    ['MNT', 'Maintenance Department', 'MAINTENANCE'], ['ENG', 'Engineering Department', 'ENGINEERING']
  ] as const;
  const departments = new Map<string, Awaited<ReturnType<typeof prisma.department.upsert>>>();
  for (const [code, name, type] of departmentSeeds) {
    const record = await prisma.department.upsert({ where: { companyId_departmentCode: { companyId: company.id, departmentCode: code } }, update: {}, create: { tenantId: tenant.id, companyId: company.id, plantId: code === 'PROD' ? plant.id : undefined, businessUnitId: code === 'PROD' ? businessUnit.id : undefined, divisionId: code === 'PROD' ? division.id : undefined, digitalDna: `FC-DEP-${code}-000001`, departmentCode: code, departmentName: name, departmentType: type, effectiveFrom } });
    departments.set(code, record);
  }
  const productionDepartment = departments.get('PROD')!;
  const section = await prisma.section.upsert({ where: { companyId_sectionCode: { companyId: company.id, sectionCode: 'LINE-OPS' } }, update: {}, create: { tenantId: tenant.id, companyId: company.id, departmentId: productionDepartment.id, digitalDna: 'FC-SEC-LINEOPS-000001', sectionCode: 'LINE-OPS', sectionName: 'Line Operations Section', effectiveFrom } });
  const team = await prisma.team.upsert({ where: { companyId_teamCode: { companyId: company.id, teamCode: 'PROD-A' } }, update: {}, create: { tenantId: tenant.id, companyId: company.id, departmentId: productionDepartment.id, sectionId: section.id, digitalDna: 'FC-TEM-PRODA-000001', teamCode: 'PROD-A', teamName: 'Production Team A', effectiveFrom } });
  const mainCostCenter = await prisma.costCenter.upsert({ where: { companyId_costCenterCode: { companyId: company.id, costCenterCode: 'MAIN-CC' } }, update: {}, create: { tenantId: tenant.id, companyId: company.id, digitalDna: 'FC-CCT-MAINCC-000001', costCenterCode: 'MAIN-CC', costCenterName: 'Main Cost Center', effectiveFrom } });
  const productionCostCenter = await prisma.costCenter.upsert({ where: { companyId_costCenterCode: { companyId: company.id, costCenterCode: 'PROD-CC' } }, update: {}, create: { tenantId: tenant.id, companyId: company.id, parentCostCenterId: mainCostCenter.id, departmentId: productionDepartment.id, plantId: plant.id, digitalDna: 'FC-CCT-PRODCC-000001', costCenterCode: 'PROD-CC', costCenterName: 'Production Cost Center', effectiveFrom } });
  const administrationCostCenter = await prisma.costCenter.upsert({ where: { companyId_costCenterCode: { companyId: company.id, costCenterCode: 'ADMIN-CC' } }, update: {}, create: { tenantId: tenant.id, companyId: company.id, parentCostCenterId: mainCostCenter.id, departmentId: departments.get('FIN')!.id, digitalDna: 'FC-CCT-ADMINCC-000001', costCenterCode: 'ADMIN-CC', costCenterName: 'Administration Cost Center', effectiveFrom } });
  const profitCenter = await prisma.profitCenter.upsert({ where: { companyId_profitCenterCode: { companyId: company.id, profitCenterCode: 'MFG-PC' } }, update: {}, create: { tenantId: tenant.id, companyId: company.id, divisionId: division.id, businessUnitId: businessUnit.id, plantId: plant.id, digitalDna: 'FC-PCT-MFGPC-000001', profitCenterCode: 'MFG-PC', profitCenterName: 'Manufacturing Profit Center', effectiveFrom } });
  const headOfficeLocation = await prisma.location.upsert({ where: { tenantId_locationCode: { tenantId: tenant.id, locationCode: 'HO-LOC' } }, update: {}, create: { tenantId: tenant.id, companyId: company.id, branchId: branch.id, digitalDna: 'FC-LOC-HOLOC-000001', locationCode: 'HO-LOC', locationName: 'Head Office Location', locationType: 'SITE', countryCode: 'UAE', city: 'Dubai', effectiveFrom } });
  const factoryLocation = await prisma.location.upsert({ where: { tenantId_locationCode: { tenantId: tenant.id, locationCode: 'FACTORY-LOC' } }, update: {}, create: { tenantId: tenant.id, companyId: company.id, plantId: plant.id, parentLocationId: headOfficeLocation.id, digitalDna: 'FC-LOC-FACTORYLOC-000001', locationCode: 'FACTORY-LOC', locationName: 'Factory Location', locationType: 'FACTORY_AREA', countryCode: 'UAE', city: 'Dubai', effectiveFrom } });

  async function seedNode(nodeType: string, referenceId: string, nodeCode: string, nodeName: string, parentId: string | null, companyId: string | null) {
    const parent = parentId ? await prisma.organizationNode.findUniqueOrThrow({ where: { id: parentId } }) : null;
    const node = await prisma.organizationNode.upsert({ where: { nodeType_referenceId: { nodeType, referenceId } }, update: { nodeName, parentNodeId: parentId }, create: { tenantId: tenant.id, companyId, nodeType, referenceId, nodeCode, nodeName, parentNodeId: parentId, hierarchyPath: parent ? `${parent.hierarchyPath}${parent.id}/` : '/', hierarchyLevel: parent ? parent.hierarchyLevel + 1 : 0, effectiveFrom } });
    const history = await prisma.organizationRelationshipHistory.findFirst({ where: { tenantId: tenant.id, organizationNodeId: node.id } });
    if (!history) await prisma.organizationRelationshipHistory.create({ data: { tenantId: tenant.id, organizationNodeId: node.id, oldParentNodeId: null, newParentNodeId: parentId, effectiveFrom, changeReason: 'DBA-003 seed hierarchy', changedById: admin.id } });
    return node;
  }
  const groupNode = await seedNode('ENTERPRISE_GROUP', enterpriseGroup.id, enterpriseGroup.groupCode, enterpriseGroup.groupName, null, null);
  const legalNode = await seedNode('LEGAL_ENTITY', legalEntity.id, legalEntity.legalEntityCode, legalEntity.legalEntityName, groupNode.id, null);
  const companyNode = await seedNode('COMPANY', company.id, company.companyCode, company.companyName, legalNode.id, company.id);
  const branchNode = await seedNode('BRANCH', branch.id, branch.branchCode, branch.branchName, companyNode.id, company.id);
  const plantNode = await seedNode('PLANT', plant.id, plant.plantCode, plant.plantName, branchNode.id, company.id);
  const businessUnitNode = await seedNode('BUSINESS_UNIT', businessUnit.id, businessUnit.businessUnitCode, businessUnit.businessUnitName, plantNode.id, company.id);
  const divisionNode = await seedNode('DIVISION', division.id, division.divisionCode, division.divisionName, businessUnitNode.id, company.id);
  const productionDepartmentNode = await seedNode('DEPARTMENT', productionDepartment.id, productionDepartment.departmentCode, productionDepartment.departmentName, divisionNode.id, company.id);
  const sectionNode = await seedNode('SECTION', section.id, section.sectionCode, section.sectionName, productionDepartmentNode.id, company.id);
  await seedNode('TEAM', team.id, team.teamCode, team.teamName, sectionNode.id, company.id);
  for (const [code, department] of departments) if (code !== 'PROD') await seedNode('DEPARTMENT', department.id, department.departmentCode, department.departmentName, companyNode.id, company.id);
  const mainCostCenterNode = await seedNode('COST_CENTER', mainCostCenter.id, mainCostCenter.costCenterCode, mainCostCenter.costCenterName, companyNode.id, company.id);
  await seedNode('COST_CENTER', productionCostCenter.id, productionCostCenter.costCenterCode, productionCostCenter.costCenterName, productionDepartmentNode.id, company.id);
  await seedNode('COST_CENTER', administrationCostCenter.id, administrationCostCenter.costCenterCode, administrationCostCenter.costCenterName, mainCostCenterNode.id, company.id);
  await seedNode('PROFIT_CENTER', profitCenter.id, profitCenter.profitCenterCode, profitCenter.profitCenterName, divisionNode.id, company.id);
  const headOfficeLocationNode = await seedNode('LOCATION', headOfficeLocation.id, headOfficeLocation.locationCode, headOfficeLocation.locationName, companyNode.id, company.id);
  await seedNode('LOCATION', factoryLocation.id, factoryLocation.locationCode, factoryLocation.locationName, headOfficeLocationNode.id, company.id);

  await prisma.userOrganizationAccess.upsert({ where: { tenantId_userId_organizationNodeId_accessLevel_validFrom: { tenantId: tenant.id, userId: admin.id, organizationNodeId: groupNode.id, accessLevel: 'ADMINISTER', validFrom: effectiveFrom } }, update: { includeDescendants: true }, create: { tenantId: tenant.id, userId: admin.id, organizationNodeId: groupNode.id, accessLevel: 'ADMINISTER', includeDescendants: true, validFrom: effectiveFrom } });
  for (const [settingKey, defaultValue] of [['timezone', 'UTC'], ['locale', 'en'], ['reportScope', 'DESCENDANTS']] as const) await prisma.organizationInheritancePolicy.upsert({ where: { tenantId_sourceNodeType_targetNodeType_settingKey: { tenantId: tenant.id, sourceNodeType: 'COMPANY', targetNodeType: 'DEPARTMENT', settingKey } }, update: {}, create: { tenantId: tenant.id, sourceNodeType: 'COMPANY', targetNodeType: 'DEPARTMENT', settingKey, inheritanceMode: 'INHERIT', allowOverride: true, defaultValue } });
  await prisma.company.update({ where: { id: company.id }, data: { hierarchyPath: companyNode.hierarchyPath, hierarchyLevel: companyNode.hierarchyLevel } });
  await prisma.branch.update({ where: { id: branch.id }, data: { plantId: plant.id, hierarchyPath: branchNode.hierarchyPath, hierarchyLevel: branchNode.hierarchyLevel, timezone: 'Asia/Dubai', effectiveFrom } });

  const companyObject = objects.find((object) => object.objectCode === 'COMPANY')!;
  await prisma.numberSeries.upsert({
    where: { id: '00000000-0000-4000-8000-000000000001' }, update: {},
    create: { id: '00000000-0000-4000-8000-000000000001', tenantId: tenant.id, companyId: company.id, branchId: branch.id, enterpriseObjectId: companyObject.id, seriesCode: 'COMPANY', prefix: 'CMP-', paddingLength: 6 }
  });

  const countrySeeds = [
    ['UAE', 'United Arab Emirates', 'AE', 'ARE', '784', '+971'], ['IND', 'India', 'IN', 'IND', '356', '+91'],
    ['USA', 'United States of America', 'US', 'USA', '840', '+1'], ['GBR', 'United Kingdom', 'GB', 'GBR', '826', '+44']
  ] as const;
  const countries = await Promise.all(countrySeeds.map(([countryCode, countryName, isoAlpha2, isoAlpha3, numericCode, phoneCode]) => prisma.country.upsert({
    where: { countryCode }, update: { countryName, isActive: true },
    create: { digitalDna: `FC-CTY-${countryCode}-000001`, countryCode, countryName, isoAlpha2, isoAlpha3, numericCode, phoneCode, defaultCurrencyId: countryCode === 'UAE' ? aed.id : currencies.find((entry) => entry.currencyCode === ({ IND: 'INR', USA: 'USD', GBR: 'EUR' } as Record<string, string>)[countryCode])?.id }
  })));
  const countryByCode = new Map(countries.map((record) => [record.countryCode, record]));
  const stateSeeds = [['UAE','DXB','Dubai'],['UAE','AUH','Abu Dhabi'],['UAE','SHJ','Sharjah'],['IND','MH','Maharashtra'],['IND','GJ','Gujarat'],['USA','CA','California'],['USA','TX','Texas'],['GBR','ENG','England']] as const;
  const states = await Promise.all(stateSeeds.map(([countryCode, stateCode, stateName]) => prisma.state.upsert({ where: { countryId_stateCode: { countryId: countryByCode.get(countryCode)!.id, stateCode } }, update: { stateName }, create: { countryId: countryByCode.get(countryCode)!.id, stateCode, stateName } })));
  const stateByCode = new Map(states.map((record) => [record.stateCode, record]));
  for (const [countryCode, stateCode, cityCode, cityName] of [['UAE','DXB','DXB','Dubai'],['UAE','AUH','AUH','Abu Dhabi'],['IND','MH','MUM','Mumbai'],['USA','CA','LAX','Los Angeles'],['GBR','ENG','LON','London']] as const) await prisma.city.upsert({ where: { countryId_stateId_cityCode: { countryId: countryByCode.get(countryCode)!.id, stateId: stateByCode.get(stateCode)!.id, cityCode } }, update: { cityName }, create: { countryId: countryByCode.get(countryCode)!.id, stateId: stateByCode.get(stateCode)!.id, cityCode, cityName } });

  const uomSeeds = [
    ['EA','Each','COUNT','ea',0],['PCS','Piece','COUNT','pc',0],['BOX','Box','COUNT','box',0],['CTN','Carton','COUNT','ctn',0],
    ['KG','Kilogram','MASS','kg',3],['G','Gram','MASS','g',3],['MT','Metric Ton','MASS','t',3],['L','Liter','VOLUME','L',3],
    ['ML','Milliliter','VOLUME','mL',3],['M','Meter','LENGTH','m',3],['M2','Square Meter','AREA','m²',4],['M3','Cubic Meter','VOLUME','m³',4],['HR','Hour','TIME','h',2]
  ] as const;
  const uoms = await Promise.all(uomSeeds.map(([uomCode,uomName,uomCategory,symbol,decimalPrecision]) => prisma.unitOfMeasure.upsert({ where: { tenantId_uomCode: { tenantId: tenant.id, uomCode } }, update: { uomName, isActive: true }, create: { tenantId: tenant.id, digitalDna: `FC-UOM-${uomCode}-000001`, uomCode, uomName, uomCategory, symbol, decimalPrecision, isBaseUom: ['EA','KG','L','M','HR'].includes(uomCode) } })));
  const uomByCode = new Map(uoms.map((record) => [record.uomCode, record]));
  const seededConversion = await prisma.uomConversion.findFirst({ where: { tenantId: tenant.id, itemId: null, fromUomId: uomByCode.get('PCS')!.id, toUomId: uomByCode.get('EA')!.id, effectiveFrom } });
  if (!seededConversion) await prisma.uomConversion.create({ data: { tenantId: tenant.id, fromUomId: uomByCode.get('PCS')!.id, toUomId: uomByCode.get('EA')!.id, conversionFactor: 1, effectiveFrom } });

  const itemGroupSeeds = [['RAW','Raw Materials'],['SFG','Semi-Finished Goods'],['FG','Finished Goods'],['CON','Consumables'],['SPR','Spare Parts'],['PKG','Packaging Materials'],['SVC','Services']] as const;
  const itemGroups = await Promise.all(itemGroupSeeds.map(([itemGroupCode,itemGroupName]) => prisma.itemGroup.upsert({ where: { tenantId_companyId_itemGroupCode: { tenantId: tenant.id, companyId: company.id, itemGroupCode } }, update: { itemGroupName }, create: { tenantId: tenant.id, companyId: company.id, digitalDna: `FC-IGR-${itemGroupCode}-000001`, itemGroupCode, itemGroupName, effectiveFrom } })));
  const itemGroupByCode = new Map(itemGroups.map((record) => [record.itemGroupCode, record]));
  const itemCategorySeeds = [['RAW','Raw Material','RAW_MATERIAL'],['SFG','Semi-Finished Good','SEMI_FINISHED_GOOD'],['FG','Finished Good','FINISHED_GOOD'],['CON','Consumable','CONSUMABLE'],['SPR','Spare Part','SPARE_PART'],['PKG','Packaging Material','PACKAGING_MATERIAL'],['SVC','Service','SERVICE']] as const;
  const itemCategories = await Promise.all(itemCategorySeeds.map(([itemCategoryCode,itemCategoryName,categoryType]) => prisma.itemCategory.upsert({ where: { tenantId_companyId_itemCategoryCode: { tenantId: tenant.id, companyId: company.id, itemCategoryCode } }, update: { itemCategoryName }, create: { tenantId: tenant.id, companyId: company.id, digitalDna: `FC-ICA-${itemCategoryCode}-000001`, itemCategoryCode, itemCategoryName, categoryType } })));
  const itemCategoryByCode = new Map(itemCategories.map((record) => [record.itemCategoryCode, record]));
  const manufacturer = await prisma.manufacturer.upsert({ where: { tenantId_manufacturerCode: { tenantId: tenant.id, manufacturerCode: 'FCMFG' } }, update: {}, create: { tenantId: tenant.id, digitalDna: 'FC-MFR-FCMFG-000001', manufacturerCode: 'FCMFG', manufacturerName: 'FlowCraft Demo Manufacturing', countryId: countryByCode.get('UAE')!.id } });
  const brand = await prisma.brand.upsert({ where: { tenantId_brandCode: { tenantId: tenant.id, brandCode: 'FLOWCRAFT' } }, update: {}, create: { tenantId: tenant.id, digitalDna: 'FC-BRD-FLOWCRAFT-000001', brandCode: 'FLOWCRAFT', brandName: 'FlowCraft', manufacturerId: manufacturer.id } });

  const stockStatusSeeds = [['AVAILABLE','Available',true,true,true,false],['RESERVED','Reserved',false,false,true,false],['QUALITY_HOLD','Quality Hold',false,false,false,true],['REJECTED','Rejected',false,false,false,true],['BLOCKED','Blocked',false,false,false,true],['DAMAGED','Damaged',false,false,false,true],['IN_TRANSIT','In Transit',false,false,true,false],['EXPIRED','Expired',false,false,false,true],['SCRAP','Scrap',false,false,false,true]] as const;
  const stockStatuses = await Promise.all(stockStatusSeeds.map(([statusCode,statusName,availableForSale,availableForProduction,availableForTransfer,requiresApprovalToRelease]) => prisma.stockStatus.upsert({ where: { tenantId_statusCode: { tenantId: tenant.id, statusCode } }, update: { statusName }, create: { tenantId: tenant.id, statusCode, statusName, availableForSale, availableForProduction, availableForTransfer, requiresApprovalToRelease } })));
  const availableStatus = stockStatuses.find((record) => record.statusCode === 'AVAILABLE')!;
  const warehouseSeeds = [['RM-WH','Raw Material Warehouse','RAW_MATERIAL'],['WIP-WH','WIP Warehouse','WIP'],['FG-WH','Finished Goods Warehouse','FINISHED_GOODS'],['QH-WH','Quality Hold Warehouse','QUALITY_HOLD'],['REJ-WH','Rejected Warehouse','REJECTED'],['SP-WH','Spare Parts Warehouse','SPARE_PARTS']] as const;
  const warehouses = await Promise.all(warehouseSeeds.map(([code,name,warehouseType]) => prisma.warehouse.upsert({ where: { companyId_code: { companyId: company.id, code } }, update: { name, tenantId: tenant.id, plantId: plant.id }, create: { tenantId: tenant.id, companyId: company.id, branchId: branch.id, plantId: plant.id, locationId: factoryLocation.id, digitalDna: `FC-WHS-${code.replaceAll('-','')}-000001`, code, name, warehouseType, defaultStockStatusId: availableStatus.id } })));
  const warehouseByCode = new Map(warehouses.map((record) => [record.code, record]));

  const paymentTermSeeds = [['IMM','Immediate',0],['NET15','Net 15',15],['NET30','Net 30',30],['NET45','Net 45',45],['NET60','Net 60',60],['NET90','Net 90',90]] as const;
  const paymentTerms = await Promise.all(paymentTermSeeds.map(([paymentTermCode,paymentTermName,dueDays]) => prisma.paymentTerm.upsert({ where: { tenantId_paymentTermCode: { tenantId: tenant.id, paymentTermCode } }, update: { paymentTermName, dueDays }, create: { tenantId: tenant.id, paymentTermCode, paymentTermName, dueDays } })));
  const paymentTermByCode = new Map(paymentTerms.map((record) => [record.paymentTermCode, record]));
  const creditTermSeeds = [['STD30','30 Days Standard',30,'WARN'],['STD45','45 Days Standard',45,'WARN'],['STD60','60 Days Standard',60,'WARN'],['HOLD','Credit Hold',0,'BLOCK']] as const;
  const creditTerms = await Promise.all(creditTermSeeds.map(([creditTermCode,creditTermName,creditDays,overdueBlockPolicy]) => prisma.creditTerm.upsert({ where: { tenantId_creditTermCode: { tenantId: tenant.id, creditTermCode } }, update: { creditTermName }, create: { tenantId: tenant.id, creditTermCode, creditTermName, creditDays, overdueBlockPolicy } })));
  for (const [incotermCode,incotermName] of [['EXW','Ex Works'],['FCA','Free Carrier'],['FOB','Free On Board'],['CFR','Cost and Freight'],['CIF','Cost Insurance and Freight'],['CPT','Carriage Paid To'],['CIP','Carriage and Insurance Paid To'],['DAP','Delivered at Place'],['DPU','Delivered at Place Unloaded'],['DDP','Delivered Duty Paid']] as const) await prisma.incoterm.upsert({ where: { incotermCode_versionYear: { incotermCode, versionYear: 2020 } }, update: { incotermName }, create: { incotermCode, incotermName, versionYear: 2020 } });
  await prisma.deliveryTerm.upsert({ where: { tenantId_deliveryTermCode: { tenantId: tenant.id, deliveryTermCode: 'STANDARD' } }, update: {}, create: { tenantId: tenant.id, deliveryTermCode: 'STANDARD', deliveryTermName: 'Standard Delivery' } });
  const taxCategory = await prisma.taxCategory.upsert({ where: { tenantId_companyId_taxCategoryCode: { tenantId: tenant.id, companyId: company.id, taxCategoryCode: 'VAT' } }, update: {}, create: { tenantId: tenant.id, companyId: company.id, taxCategoryCode: 'VAT', taxCategoryName: 'Value Added Tax' } });
  await prisma.taxCode.upsert({ where: { tenantId_companyId_taxCode_effectiveFrom: { tenantId: tenant.id, companyId: company.id, taxCode: 'VAT5', effectiveFrom } }, update: {}, create: { tenantId: tenant.id, companyId: company.id, taxCode: 'VAT5', taxName: 'UAE VAT 5%', taxCategoryId: taxCategory.id, countryId: countryByCode.get('UAE')!.id, taxType: 'VAT', rate: 5, recoverablePercentage: 100, effectiveFrom } });

  const partnerSeeds = [['CUST-DEMO','Demo Customer','CUSTOMER'],['SUPP-DEMO','Demo Supplier','SUPPLIER'],['BOTH-DEMO','Demo Partner','BOTH']] as const;
  const partners = await Promise.all(partnerSeeds.map(([partnerCode,partnerName,partnerType]) => prisma.businessPartner.upsert({ where: { tenantId_companyId_partnerCode: { tenantId: tenant.id, companyId: company.id, partnerCode } }, update: { partnerName, partnerType }, create: { tenantId: tenant.id, companyId: company.id, digitalDna: `FC-BPR-${partnerCode.replaceAll('-','')}-000001`, partnerCode, partnerName, legalName: partnerName, partnerType, countryId: countryByCode.get('UAE')!.id, defaultCurrencyId: aed.id, paymentTermId: paymentTermByCode.get('NET30')!.id, creditTermId: creditTerms[0].id, effectiveFrom } })));
  const partnerByCode = new Map(partners.map((record) => [record.partnerCode, record]));
  const demoCustomer = await prisma.customer.upsert({ where: { companyId_code: { companyId: company.id, code: 'CUST-DEMO' } }, update: { businessPartnerId: partnerByCode.get('CUST-DEMO')!.id }, create: { companyId: company.id, businessPartnerId: partnerByCode.get('CUST-DEMO')!.id, code: 'CUST-DEMO', name: 'Demo Customer', creditLimit: 100000 } });
  await prisma.customer.upsert({ where: { companyId_code: { companyId: company.id, code: 'BOTH-DEMO' } }, update: { businessPartnerId: partnerByCode.get('BOTH-DEMO')!.id }, create: { companyId: company.id, businessPartnerId: partnerByCode.get('BOTH-DEMO')!.id, code: 'BOTH-DEMO', name: 'Demo Partner', creditLimit: 50000 } });
  const demoSupplier = await prisma.supplier.upsert({ where: { companyId_code: { companyId: company.id, code: 'SUPP-DEMO' } }, update: { businessPartnerId: partnerByCode.get('SUPP-DEMO')!.id }, create: { companyId: company.id, businessPartnerId: partnerByCode.get('SUPP-DEMO')!.id, code: 'SUPP-DEMO', name: 'Demo Supplier', defaultPurchaseCurrencyId: aed.id, defaultPaymentTermId: paymentTermByCode.get('NET30')!.id } });
  await prisma.supplier.upsert({ where: { companyId_code: { companyId: company.id, code: 'BOTH-DEMO' } }, update: { businessPartnerId: partnerByCode.get('BOTH-DEMO')!.id }, create: { companyId: company.id, businessPartnerId: partnerByCode.get('BOTH-DEMO')!.id, code: 'BOTH-DEMO', name: 'Demo Partner', defaultPurchaseCurrencyId: aed.id } });
  const demoAddress = await prisma.address.upsert({ where: { id: '00000000-0000-4000-8000-000000000404' }, update: {}, create: { id: '00000000-0000-4000-8000-000000000404', tenantId: tenant.id, companyId: company.id, addressType: 'BUSINESS', addressLine1: 'FlowCraft Demo District', countryId: countryByCode.get('UAE')!.id, stateId: stateByCode.get('DXB')!.id, isPrimary: true, effectiveFrom } });
  const demoContact = await prisma.contactPerson.upsert({ where: { id: '00000000-0000-4000-8000-000000000405' }, update: {}, create: { id: '00000000-0000-4000-8000-000000000405', tenantId: tenant.id, digitalDna: 'FC-CON-DEMO-000001', firstName: 'Demo', lastName: 'Contact', displayName: 'Demo Contact', email: 'contact@example.invalid', isPrimary: true } });
  await prisma.businessPartnerAddress.upsert({ where: { businessPartnerId_addressId_addressRole_effectiveFrom: { businessPartnerId: partnerByCode.get('CUST-DEMO')!.id, addressId: demoAddress.id, addressRole: 'BILLING', effectiveFrom } }, update: { isDefault: true }, create: { businessPartnerId: partnerByCode.get('CUST-DEMO')!.id, addressId: demoAddress.id, addressRole: 'BILLING', isDefault: true, effectiveFrom } });
  await prisma.businessPartnerContact.upsert({ where: { businessPartnerId_contactPersonId_contactRole_effectiveFrom: { businessPartnerId: partnerByCode.get('CUST-DEMO')!.id, contactPersonId: demoContact.id, contactRole: 'PRIMARY', effectiveFrom } }, update: { isDefault: true }, create: { businessPartnerId: partnerByCode.get('CUST-DEMO')!.id, contactPersonId: demoContact.id, contactRole: 'PRIMARY', isDefault: true, effectiveFrom } });
  await prisma.creditProfile.upsert({ where: { tenantId_companyId_businessPartnerId_effectiveFrom: { tenantId: tenant.id, companyId: company.id, businessPartnerId: partnerByCode.get('CUST-DEMO')!.id, effectiveFrom } }, update: {}, create: { tenantId: tenant.id, companyId: company.id, businessPartnerId: partnerByCode.get('CUST-DEMO')!.id, creditTermId: creditTerms[0].id, creditLimit: 100000, effectiveFrom } });

  const itemSeeds = [
    ['RM-AL-6061','Aluminium 6061 Bar','RAW_MATERIAL','RAW','KG',true,false,false,false,500,4.8],
    ['SFG-VALVE-BODY','Machined Valve Body','SEMI_FINISHED_GOOD','SFG','EA',true,false,false,true,100,18],
    ['FG-VALVE-100','Precision Valve Assembly','FINISHED_GOOD','FG','EA',true,false,true,true,50,42.5],
    ['PKG-CARTON-100','Valve Shipping Carton','PACKAGING_MATERIAL','PKG','PCS',true,true,false,false,200,1.2],
    ['SP-BEARING-6204','Bearing 6204','SPARE_PART','SPR','EA',true,true,false,false,20,6.5],
    ['SVC-INSTALL','Installation Service','SERVICE','SVC','HR',false,false,true,false,0,0]
  ] as const;
  const items = await Promise.all(itemSeeds.map(([itemCode,name,itemType,classification,uomCode,isStockItem,isPurchaseItem,isSalesItem,isManufacturedItem,reorderLevel,standardCost]) => prisma.item.upsert({
    where: { tenantId_companyId_itemCode: { tenantId: tenant.id, companyId: company.id, itemCode } },
    update: { name, itemGroupId: itemGroupByCode.get(classification)!.id, itemCategoryId: itemCategoryByCode.get(classification)!.id },
    create: { tenantId: tenant.id, companyId: company.id, digitalDna: `FC-ITM-${itemCode.replaceAll('-','')}-000001`, sku: itemCode, itemCode, name, itemType, itemGroupId: itemGroupByCode.get(classification)!.id, itemCategoryId: itemCategoryByCode.get(classification)!.id, brandId: brand.id, manufacturerId: manufacturer.id, uom: uomCode, baseUomId: uomByCode.get(uomCode)!.id, stockUomId: uomByCode.get(uomCode)!.id, purchaseUomId: isPurchaseItem ? uomByCode.get(uomCode)!.id : undefined, salesUomId: isSalesItem ? uomByCode.get(uomCode)!.id : undefined, manufacturingStrategy: isManufacturedItem ? 'MTS' : 'MTO', replenishmentPolicy: isStockItem ? 'REORDER_POINT' : 'MANUAL', trackingMethod: 'NONE', isStockItem, isPurchaseItem, isSalesItem, isManufacturedItem, isMaintenanceSpare: classification === 'SPR', isQualityInspectionRequired: classification === 'RAW' || classification === 'FG', reorderLevel, reorderPoint: reorderLevel, reorderQuantity: reorderLevel, standardCost, defaultWarehouseId: isStockItem ? warehouseByCode.get(classification === 'RAW' ? 'RM-WH' : classification === 'FG' ? 'FG-WH' : classification === 'SPR' ? 'SP-WH' : 'WIP-WH')!.id : undefined, defaultSupplierId: isPurchaseItem ? demoSupplier.id : undefined, countryOfOriginId: countryByCode.get('UAE')!.id, effectiveFrom }
  })));

  console.log([
    'FlowCraft seed summary:',
    '- tenant seeded',
    `- currencies seeded (${currencies.length})`,
    '- company seeded',
    '- branch seeded',
    '- admin user seeded',
    `- roles seeded (${roleRecords.length})`,
    `- permissions seeded (${allPermissions.length})`,
    `- first 50 enterprise objects seeded (${objects.length})`,
    `- DBA-003 enterprise objects seeded (${dba003Objects.length})`,
    `- DBA-004 enterprise objects seeded (${dba004Objects.length})`,
    '- enterprise structure hierarchy seeded',
    `- organization departments seeded (${departments.size})`,
    '- organization access and inheritance policies seeded',
    `- countries/states seeded (${countries.length}/${states.length})`,
    `- units of measure seeded (${uoms.length})`,
    `- item groups/categories seeded (${itemGroups.length}/${itemCategories.length})`,
    `- warehouses/stock statuses seeded (${warehouses.length}/${stockStatuses.length})`,
    `- business partners seeded (${partners.length}; customer ${demoCustomer.code})`,
    `- payment/credit terms seeded (${paymentTerms.length}/${creditTerms.length})`,
    `- demo item masters seeded (${items.length})`,
    '- no operational stock balances created',
    '- seed completed successfully'
  ].join('\n'));
}

main().then(() => prisma.$disconnect()).catch(async (error: unknown) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
