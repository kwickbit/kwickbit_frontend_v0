<<<<<<< HEAD
import { LoginAPIProps, LoginAPIResponse, fetchLogin } from "@/services/auth";
=======
import {
  LoginAPIProps,
  LoginAPIResponse,
  SignupAPIProps,
  fetchLogin,
  fetchSignup,
} from "@/services/auth";
>>>>>>> 22f62464a63a84a64a3ecea5f123c8ea8ed4410e
import { UseMutationResult, useMutation } from "@tanstack/react-query";

export const useMutationLogin = (): UseMutationResult<
  LoginAPIResponse,
  Error,
  LoginAPIProps,
  unknown
> => {
  return useMutation({ mutationFn: fetchLogin });
};
<<<<<<< HEAD
=======

export const useMutationSignup = (): UseMutationResult<
  any,
  Error,
  SignupAPIProps,
  unknown
> => {
  return useMutation({ mutationFn: fetchSignup });
};
>>>>>>> 22f62464a63a84a64a3ecea5f123c8ea8ed4410e
