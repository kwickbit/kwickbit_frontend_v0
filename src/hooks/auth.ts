import {
  ConfirmCodeAPIProps,
  ConfirmCodeAPIResponse,
  LoginAPIProps,
  LoginAPIResponse,
  SignupAPIProps,
  fetchConfirmCode,
  fetchLogin,
  fetchResendCode,
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

export const useMutationConfirmCode = (): UseMutationResult<
  ConfirmCodeAPIResponse,
  Error,
  ConfirmCodeAPIProps,
  unknown
> => {
  return useMutation({ mutationFn: fetchConfirmCode });
};

export const useMutationResendCode = (): UseMutationResult<
  any,
  Error,
  {
    username: string;
  },
  unknown
> => {
  return useMutation({ mutationFn: fetchResendCode });
};
