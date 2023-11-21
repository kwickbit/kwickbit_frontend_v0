import { LoginAPIProps, LoginAPIResponse, fetchLogin } from "@/services/auth";
import { UseMutationResult, useMutation } from "@tanstack/react-query";

export const useMutationLogin = (): UseMutationResult<
  LoginAPIResponse,
  Error,
  LoginAPIProps,
  unknown
> => {
  return useMutation({ mutationFn: fetchLogin });
};
