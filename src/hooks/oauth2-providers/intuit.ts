import {
  GetOAuth2CallbackResponse,
  oauth2CallbackIntuit,
  RequestBodyCallBackIntuit,
} from "@/services/integrations";
import { UseMutationResult, useMutation } from "@tanstack/react-query";

export const useMutationIntegrationsOAuth2CallbackIntuit = (): UseMutationResult<
  GetOAuth2CallbackResponse,
  Error,
  RequestBodyCallBackIntuit
> => {
  return useMutation({
    mutationFn: oauth2CallbackIntuit,
  });
};
