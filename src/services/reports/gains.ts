import { apiClient } from "@/lib/api-client";
import { Token } from "@/services/token_currencies_conversions";
import { BaseAccountingReport } from "@/services/reports";


export interface GetAllGainsReportsAPIResult {
  message: string;
  data: GainsReport[];
  nextCursor: object;
}

export interface CreateGainsReportAPIResult {
  message: string;
  data: GainsReport;
  nextCursor: object;
}

export interface GainsReport extends BaseAccountingReport {
  assets: GainsReportAsset[];
}

export interface GainsReportAsset {
  token: Token;
  tokenBalance: number;
  totalCosts: AmountsByCostingMethod;
  realizedGains: AmountsByCostingMethod;
  unrealizedGains: AmountsByCostingMethod;
}

interface AmountsByCostingMethod {
  fifo: number;
  lifo: number;
  hifo: number;
}

export enum CostingMethod {
  FIFO = "fifo",
  LIFO = "lifo",
  HIFO = "hifo",
}

type TotalProvidedCostsByMethod = {
  [K in CostingMethod]: number;
}

export interface ProvidedCosts extends TotalProvidedCostsByMethod {
  asset: Token;
  tokenBalance: number;
}

export interface CreateGainsReportAPIProps {
  deduplicationId: string;
  batchId: string;
  totalJobsCount: number;
  transactionsStartDate: string;
  transactionsEndDate: string;
  providedCosts: ProvidedCosts[];
}

export const getAllGainsReports = async (): Promise<GetAllGainsReportsAPIResult> => {
  const { data } = await apiClient.get("/reports/gains/list");
  return data;
};

export const postCreateGainsReport = async (
  props: CreateGainsReportAPIProps,
): Promise<CreateGainsReportAPIResult> => {
  const { data } = await apiClient.post("/reports/gains", props);
  return data;
};
