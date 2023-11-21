import { BaseSyntheticEvent } from "react";
<<<<<<< HEAD
import { LoginAPIProps, LoginAPIResponse } from "@/services/auth";
import { toast } from "react-toastify";
import { UseFormReturn, useForm } from "react-hook-form";
import { useMutationLogin } from "./auth";
import { UseMutationResult } from "@tanstack/react-query";
=======
import { SignupAPIProps } from "@/services/auth";
import { toast } from "react-toastify";
import { UseFormReturn, useForm } from "react-hook-form";
import { UseMutationResult } from "@tanstack/react-query";
import { useMutationSignup } from "./auth";
>>>>>>> 22f62464a63a84a64a3ecea5f123c8ea8ed4410e
import { useRouter } from "next/router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const defaultValues = {
  username: "",
  password: "",
<<<<<<< HEAD
};

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
=======
  email: "",
  givenName: "",
  familyName: "",
  address: "",
};

const signUpSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  email: z.string().email().min(1, "Email is required"),
  givenName: z.string().min(1, "Given Name is required"),
  familyName: z.string().min(1, "Family Name is required"),
  address: z.string().min(1, "Address is required"),
>>>>>>> 22f62464a63a84a64a3ecea5f123c8ea8ed4410e
});

interface ReturnProps {
  methods: UseFormReturn<
    {
      username: string;
      password: string;
<<<<<<< HEAD
=======
      email: string;
      givenName: string;
      familyName: string;
      address: string;
>>>>>>> 22f62464a63a84a64a3ecea5f123c8ea8ed4410e
    },
    any,
    undefined
  >;
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
<<<<<<< HEAD
  login: UseMutationResult<LoginAPIResponse, Error, LoginAPIProps, unknown>;
}

const useLogin = (): ReturnProps => {
  const router = useRouter();

  const login = useMutationLogin();

  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const { handleSubmit, watch } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    login.mutate(data, {
      onSuccess: (data) => {
        const redirectURL = router.query.redirect ?? "/";

        if (data.result === "NEW_PASSWORD_REQUIRED") {
          const requiredAttributes = data.requiredAttributes ?? [];
          router.push(
            `/change-password?username=${
              values.username
            }&requiredAttributes=${requiredAttributes.join(
              ","
            )}&redirect=${redirectURL}`
          );
          toast.info(data.message);
        } else if (data.result === "CONFIRMATION_CODE_REQUIRED") {
          router.push(
            `/confirm-code?username=${data.otherAttributes.username}`
          );
          toast.info(data.message);
        } else if (data.result === "LOGIN_SUCCESSFUL") {
          router.push(redirectURL as string);
          toast.success(data.message);
        } else {
          toast.error("Could not change password. Please try to login again");
          return new Promise(() => {});
        }
      },
      onError: (err) => {
        console.log({ err });
        toast.error("Account not found.");
=======
  signup: UseMutationResult<any, Error, SignupAPIProps, unknown>;
}

const useSignup = (): ReturnProps => {
  const signup = useMutationSignup();

  const methods = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    signup.mutate(data, {
      onSuccess: () => {
        router.push("/signup/success");
      },
      onError: () => {
        //API Should return a error message
        toast.error("Something went wrong, please try again.");
>>>>>>> 22f62464a63a84a64a3ecea5f123c8ea8ed4410e
      },
    });
  });

<<<<<<< HEAD
  return { methods, onSubmit, login };
};

export default useLogin;
=======
  return { methods, onSubmit, signup };
};

export default useSignup;
>>>>>>> 22f62464a63a84a64a3ecea5f123c8ea8ed4410e
