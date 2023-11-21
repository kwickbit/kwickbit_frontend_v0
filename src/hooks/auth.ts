import {
  LoginAPIProps,
  LoginAPIResponse,
  SignupAPIProps,
  fetchLogin,
  fetchSignup,
} from "@/services/auth";
import { UseMutationResult, useMutation } from "@tanstack/react-query";

export const useMutationLogin = (): UseMutationResult<
  LoginAPIResponse,
  Error,
  LoginAPIProps,
  unknown
> => {
  return useMutation({ mutationFn: fetchLogin });
};

export const useMutationSignup = (): UseMutationResult<
  any,
  Error,
  SignupAPIProps,
  unknown
> => {
  return useMutation({ mutationFn: fetchSignup });
};
