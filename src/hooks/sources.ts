import { fetchSources } from "@/services/sources";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const useQuerySources = (): UseQueryResult<any, Error> => {
  return useQuery({ queryKey: ["sources"], queryFn: fetchSources });
};
