import { BaseSyntheticEvent, useState } from "react";
import { ConfirmCodeAPIProps, ConfirmCodeAPIResponse } from "@/services/auth";
import { toast } from "react-toastify";
import { UseFormReturn, useForm } from "react-hook-form";
import { useMutationConfirmCode, useMutationResendCode } from "./auth";
import { UseMutationResult } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const confirmationCodeSchema = z.object({
  confirmationCode: z.string().min(1, "Confirmation code is required."),
});

const defaultValues = {
  confirmationCode: "",
};

interface ReturnProps {
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  methods: UseFormReturn<
    {
      confirmationCode: string;
    },
    any,
    undefined
  >;
  confirmCode: UseMutationResult<
    ConfirmCodeAPIResponse,
    Error,
    ConfirmCodeAPIProps,
    unknown
  >;
  resendCode: UseMutationResult<
    any,
    Error,
    {
      username: string;
    },
    unknown
  >;
  handleResendCode: () => Promise<void>;
  shouldRequestNewConfirmationCode: boolean;
}

const useConfirmCode = (): ReturnProps => {
  const router = useRouter();
  const username = router.query.username as string;

  const [
    shouldRequestNewConfirmationCode,
    setShouldRequestNewConfirmationCode,
  ] = useState(false);

  const confirmCode = useMutationConfirmCode();
  const resendCode = useMutationResendCode();

  const methods = useForm({
    resolver: zodResolver(confirmationCodeSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    confirmCode.mutate(
      { username, ...data },
      {
        onSuccess: (res) => {
          if (res.result === "CODE_CONFIRMED_SUCCESSFULLY") {
            router.push("/login");
            toast.success("Code confirmed successfully. You can log in now.");
          } else if (res.errorCode === "CodeMismatchException") {
            toast.error("Wrong confirmation code provided.");
          } else if (res.errorCode === "ExpiredCodeException") {
            setShouldRequestNewConfirmationCode(true); // Show the button to request a new code
            toast.error(
              "Confirmation code expired. Please request a new code."
            );
          } else {
            toast.error("An error occurred. Please try again.");
          }
        },
        onError: () => {
          toast.error("An error occurred. Please try again.");
        },
      }
    );
  });

  const handleResendCode = async (): Promise<void> => {
    resendCode.mutate(
      { username },
      {
        onSuccess: (res) => {
          if (res.result === "RESENT_CODE_SUCCESSFULLY") {
            toast.success(
              `A new confirmation code has been sent to ${res.deliveryDetails.destination}`
            );
            setShouldRequestNewConfirmationCode(false);
          } else if (res.errorCode) {
            toast.error(
              "Failed to resend confirmation code. Please try again later."
            );
          }
        },
        onError: () => {
          toast.error(
            "Failed to resend confirmation code. Please try again later."
          );
        },
      }
    );
  };

  return {
    onSubmit,
    methods,
    confirmCode,
    resendCode,
    handleResendCode,
    shouldRequestNewConfirmationCode,
  };
};

export default useConfirmCode;
