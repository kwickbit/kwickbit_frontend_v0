import { fetchIntegrationInformation, fetchRequestState } from "@/services/integrations";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery
} from "@tanstack/react-query";


export const useQueryIntegrationInformation = (): UseQueryResult<
  any,
  Error
> => {
  return useQuery({
    queryKey: ["integration-info"],
    queryFn: fetchIntegrationInformation,
  });
};

export const useMutationRequestState = (): UseMutationResult<
  any,
  Error,
  void,
  unknown
> => {
  return useMutation({ mutationFn: fetchRequestState });
};
