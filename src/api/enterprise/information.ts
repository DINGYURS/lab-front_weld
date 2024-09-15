import { http } from "@/utils/http";

export type InformationParam = {
  enterpriseName: string;
};
export type InformationData = {
  enterpriseId?: number;
  enterpriseName?: string;
  organizationCode?: string;
  manageStatus?: string;
  industryCode?: string;
  industryType?: string;
  registeredCapital?: number;
  actuallyReceivedCapital?: number;
  enterpriseArea?: string;
  registeredAddress?: string;
  establishDate?: string;
  legalPerson?: string;
  enterpriseType?: string;
  mainProducts?: string;
  industrialChain?: string;
  segment?: string;
  competitiveness?: Competitiveness;
  finance?: Finance;
  develop?: Develop;
  solvency?: Solvency;
};
export type Competitiveness = {
  competitivenessId?: number;
  enterpriseId?: number;
  recognitionSituation?: string;
  honorListedCompany?: string;
  honorIndividualChampion?: string;
  honorMasteryType?: string;
  honorHiddenChampion?: string;
  honorGazelleEnterprise?: string;
  honorGreenFactory?: string;
  honorOther?: string;
  platformResearchInstitute?: string;
  platformEngineeringCenter?: string;
  platformWorkstation?: string;
  platformOther?: string;
  mainAccumulatedPatent?: string;
  mainCurrentTechnological?: string;
  mainCurrentAchievements?: string;
  mainFutureTechnological?: string;
  mainFutureTarget?: string;
  majorProjectName?: string;
  majorProjectCode?: string;
  majorBuildStart?: string;
  majorBuildEnd?: string;
  majorTotalInvestment?: number;
  majorCurrentCapacity?: string;
  majorPlanCapacity?: string;
  importantPerson?: string;
  majorPolicies?: string;

};
export type Finance = {
  financeId?: number;
  enterpriseId?: number;
  recordYear?: string;
  assetSize?: number;
  debtSituation?: number;
  ownerEquity?: number;
  totalProfit?: number;
  totalTax?: number;
  netProfit?: number;
  researchInput?: number;
  totalOutput?: number;
  addValue?: number;
  salesOutput?: number;
  exportValue?: number;
  totalIncome?: number;
  netCashFlow?: number;
};
export type Develop = {
  developId?: number;
  enterpriseId?: number;
  recordYear?: string;
  inventoryTurnoverRatio?: number;
  roe?: number;
  profitRatio?: number;
  profitGrowthRatio?: number;
};
export type Solvency = {
  solvencyId?: number;
  enterpriseId?: number;
  recordYear?: string;
  debtAssetRatio?: number;
  currentRatio?: number;
  equityRatio?: number;
  timesInterestEarned?: number;
};

/** 获取企业列表 */
export const getInformationPage = (data?: object) => {
  return http.request<TableData<InformationData>>("post", "enterprise/information/list", { data });
};

/** 获取企业财务经营情况、营运发展能力、偿债能力 */
export const getRateTabByYear = (data?: object) => {
  return http.request<any>("post", "enterprise/information/rateByYear", { data });
};
/** 修改/新增企业基础信息 */
export const saveInformation = (data?: InformationData) => {
  return http.request<any>("post", `enterprise/information/${data.enterpriseId ? "update" : "add"}`, {
    data
  });
};
/** 修改/新增企业竞争力 */
export const saveCompetitiveness = (data?: Competitiveness) => {
  return http.request<any>("post", `enterprise/information/${data.competitivenessId ? "updateCompetitiveness" : "addCompetitiveness"}`, {
    data
  });
};
/** 修改/新增企业财务经营能力 */
export const saveFinance = (data?: Finance) => {
  return http.request<any>("post", `enterprise/information/${data.financeId ? "updateFinance" : "addFinance"}`, {
    data
  });
};
/** 修改/新增企业营运发展能力 */
export const saveDevelop = (data?: Develop) => {
  return http.request<any>("post", `enterprise/information/${data.developId ? "updateDevelop" : "addDevelop"}`, {
    data
  });
};
/** 修改/新增企业偿债能力 */
export const saveSolvency = (data?: Solvency) => {
  return http.request<any>("post", `enterprise/information/${data.solvencyId ? "updateSolvency" : "addSolvency"}`, {
    data
  });
};


// /** 删除用户 */
// export const removeUser = (data?: { ids: number[] }) => {
//   return http.request<any>("post", "/user/remove", { data });
// };