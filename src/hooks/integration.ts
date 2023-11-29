import {
  GetIntegrationsAPIResponse,
  fetchIntegration,
} from "@/services/integration";
import { UseMutationResult, useMutation } from "@tanstack/react-query";

// export const useMutationIntegrations = (
//   code: string
// ): UseMutationResult<GetIntegrationsAPIResponse, Error> => {
//   return useMutation({
//     mutationFn: fetchIntegration,
//   });
// };

export const useMutationIntegrations = (): UseMutationResult<
  GetIntegrationsAPIResponse,
  Error,
  string
> => {
  return useMutation({
    mutationFn: fetchIntegration,
  });
};
