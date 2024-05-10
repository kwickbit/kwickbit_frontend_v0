import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { GetAPIKeysAPIResponse, fetchAPIKeys } from "@/services/apiKeys";

export const useQueryAPIKeys = (): UseQueryResult<
  GetAPIKeysAPIResponse,
  Error
> => {
  return useQuery({ queryKey: ["api-keys"], queryFn: fetchAPIKeys });
};
