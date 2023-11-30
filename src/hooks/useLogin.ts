import { BaseSyntheticEvent } from "react";
import { LoginAPIProps, LoginAPIResponse } from "@/services/auth";
import { toast } from "react-toastify";
import { UseFormReturn, useForm } from "react-hook-form";
import { useMutationLogin } from "./auth";
import { UseMutationResult } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const defaultValues = {
  username: "",
  password: "",
};

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

interface ReturnProps {
  methods: UseFormReturn<
    {
      username: string;
      password: string;
    },
    any,
    undefined
  >;
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
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
          router.push("/sources");
          toast.success(data.message);
        } else {
          toast.error("Could not change password. Please try to login again");
          return new Promise(() => {});
        }
      },
      onError: () => {
        //API Should return error message
        toast.error("Account not found.");
      },
    });
  });

  return { methods, onSubmit, login };
};

export default useLogin;
