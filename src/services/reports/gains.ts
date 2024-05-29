import { apiClient } from "@/lib/api-client";
import { Token } from "@/services/token_currencies_conversions";

export interface GetGainsReportAPIResult {
  message: string;
  data: GainsReport;
  nextCursor: object;
}

export interface GainsReport {
  reportId: string;
  reportEndDate: string;
  reportStartDate: string;
  assets: GainsReportAsset[];
}

export interface GainsReportAsset {
  token: Token;
  realizedGains: Gains;
  unrealizedGains: Gains;
}

interface Gains {
  fifo: number;
  lifo: number;
  hifo: number;
}

export enum CostingMethod {
  FIFO = "fifo",
  LIFO = "lifo",
  HIFO = "hifo",
}

export const getGainsReport = async (): Promise<GetGainsReportAPIResult> => {
  const { data } = await apiClient.get("/reports/gains");

  return data;
};
