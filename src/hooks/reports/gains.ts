import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type GetAllGainsReportsAPIResult,
  getAllGainsReports,
  postCreateGainsReport,
  CreateGainsReportAPIProps,
} from "@/services/reports/gains";
import { AxiosError } from "axios";


const queryKey = ["gain-reports"];

export const useMutationCreateGainsReport = (): UseMutationResult<
  any,
  AxiosError<any>,
  CreateGainsReportAPIProps,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCreateGainsReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });
};

export const useQueryAllGainsReports = (): UseQueryResult<
  GetAllGainsReportsAPIResult,
  Error
> => useQuery({
  queryKey: [...queryKey, "all-gains-reports"],
  queryFn: getAllGainsReports,
});
