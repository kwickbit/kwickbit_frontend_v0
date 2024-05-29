import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { GetGainsReportAPIResult, getGainsReport } from "@/services/reports/gains";


const queryKey = ["gain-reports"];

export const useQueryGainsReport = (): UseQueryResult<
  GetGainsReportAPIResult,
  Error
> => {
  return useQuery({
    queryKey,
    queryFn: getGainsReport,
  });
};
