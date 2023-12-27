import {
  CreateSourceAPIProps,
  GetSourcesAPIResponse,
  fetchCreateSource,
  fetchSources,
} from "@/services/sources";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const key = "sources";

export const useQuerySources = (): UseQueryResult<
  GetSourcesAPIResponse,
  Error
> => {
  return useQuery({ queryKey: [key], queryFn: fetchSources });
};

export const useMutationCreateSource = (): UseMutationResult<
  any,
  Error,
  CreateSourceAPIProps,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchCreateSource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
};
