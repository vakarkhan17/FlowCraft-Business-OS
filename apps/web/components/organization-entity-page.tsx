import { FoundationList } from './foundation-list';

const configs = {
  'enterprise-groups': { title: 'Enterprise Groups', code: 'groupCode', name: 'groupName', fields: ['groupCode', 'groupName', 'legalName', 'countryCode', 'baseCurrencyId'] },
  'legal-entities': { title: 'Legal Entities', code: 'legalEntityCode', name: 'legalEntityName', fields: ['legalEntityCode', 'legalEntityName', 'legalName', 'enterpriseGroupId', 'countryCode', 'baseCurrencyId'] },
  plants: { title: 'Plants', code: 'plantCode', name: 'plantName', fields: ['plantCode', 'plantName', 'plantType', 'companyId', 'branchId', 'legalEntityId', 'countryCode', 'timezone'] },
  'business-units': { title: 'Business Units', code: 'businessUnitCode', name: 'businessUnitName', fields: ['businessUnitCode', 'businessUnitName', 'companyId', 'parentBusinessUnitId', 'description'] },
  divisions: { title: 'Divisions', code: 'divisionCode', name: 'divisionName', fields: ['divisionCode', 'divisionName', 'companyId', 'businessUnitId', 'parentDivisionId', 'description'] },
  departments: { title: 'Departments', code: 'departmentCode', name: 'departmentName', fields: ['departmentCode', 'departmentName', 'departmentType', 'companyId', 'plantId', 'businessUnitId', 'divisionId', 'parentDepartmentId'] },
  sections: { title: 'Sections', code: 'sectionCode', name: 'sectionName', fields: ['sectionCode', 'sectionName', 'companyId', 'departmentId', 'parentSectionId'] },
  teams: { title: 'Teams', code: 'teamCode', name: 'teamName', fields: ['teamCode', 'teamName', 'companyId', 'departmentId', 'sectionId', 'parentTeamId'] },
  locations: { title: 'Locations', code: 'locationCode', name: 'locationName', fields: ['locationCode', 'locationName', 'locationType', 'companyId', 'branchId', 'plantId', 'parentLocationId', 'countryCode'] },
  'cost-centers': { title: 'Cost Centers', code: 'costCenterCode', name: 'costCenterName', fields: ['costCenterCode', 'costCenterName', 'companyId', 'departmentId', 'plantId', 'parentCostCenterId'] },
  'profit-centers': { title: 'Profit Centers', code: 'profitCenterCode', name: 'profitCenterName', fields: ['profitCenterCode', 'profitCenterName', 'companyId', 'divisionId', 'businessUnitId', 'plantId', 'parentProfitCenterId'] }
} as const;

export type OrganizationResource = keyof typeof configs;

function label(value: string) { return value.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase()); }

export function OrganizationEntityPage({ resource }: { resource: OrganizationResource }) {
  const config = configs[resource];
  return <FoundationList
    title={config.title}
    subtitle={`Effective-dated ${config.title.toLowerCase()} in the enterprise hierarchy`}
    endpoint={`/organization/${resource}`}
    objectCode="ORGANIZATION_NODE"
    columns={[{ key: config.code, label: 'Code' }, { key: config.name, label: 'Name' }, { key: 'status', label: 'Status' }]}
    fields={config.fields.map((field, index) => ({ key: field, label: label(field), required: index < 2 || field === 'companyId' }))}
  />;
}
