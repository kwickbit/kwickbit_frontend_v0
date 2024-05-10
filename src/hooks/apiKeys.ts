import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  CreateAPIKeyAPIProps,
  GetAPIKeysAPIResponse,
  getAPIKeys,
  postCreateAPIKey,
} from "@/services/apiKeys";

const queryKey = ["api-keys"];

export const useQueryAPIKeys = (): UseQueryResult<
  GetAPIKeysAPIResponse,
  Error
> => {
  return useQuery({
    queryKey,
    queryFn: getAPIKeys
  });
};

export const useMutationCreateAPIKey = (): UseMutationResult<
  any,
  Error,
  CreateAPIKeyAPIProps,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCreateAPIKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
