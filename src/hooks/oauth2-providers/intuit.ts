import {
  fetchIntegrationInformation,
  fetchRequestState,
  GetOAuth2CallbackResponse,
  oauth2CallbackIntuit,
  RequestBodyCallBackIntuit,
} from "@/services/integrations";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const key = "integration-info";

export const useQueryIntegrationInformation = (): UseQueryResult<
  any,
  Error
> => {
  return useQuery({
    queryKey: ["integration-info"],
    queryFn: fetchIntegrationInformation,
  });
};

export const useMutationIntegrationsOAuth2CallbackIntuit =
  (): UseMutationResult<
    GetOAuth2CallbackResponse,
    Error,
    RequestBodyCallBackIntuit
  > => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: oauth2CallbackIntuit,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [key] });
      },
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
