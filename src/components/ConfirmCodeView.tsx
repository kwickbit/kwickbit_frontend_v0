import React, { ReactNode } from "react";
import AuthLayout from "@/components/AuthLayout";
import FormProvider from "@/components/FormProvider";
import RHFTextField from "@/components/RHFTextField";
import PrimaryButton from "@/components/PrimaryButton";
import useConfirmCode from "@/hooks/useConfirmCode";

const ConfirmCodeView = (): ReactNode => {
  const {
    onSubmit,
    methods,
    confirmCode,
    resendCode,
    handleResendCode,
    shouldRequestNewConfirmationCode,
  } = useConfirmCode();

  return (
    <AuthLayout title="Cofirmation code">
      <FormProvider onSubmit={onSubmit} methods={methods} className="w-full">
        <div className="flex flex-col gap-4 w-full">
          <RHFTextField
            name="confirmationCode"
            label="Code"
            placeholder="Enter your code here "
          />
          <div className="flex gap-4 justify-between">
            <PrimaryButton type="submit" isLoading={confirmCode.isPending}>
              Confirm
            </PrimaryButton>
            {shouldRequestNewConfirmationCode && (
              <PrimaryButton
                onClick={handleResendCode}
                isLoading={resendCode.isPending}
                type="button"
              >
                Resend
              </PrimaryButton>
            )}
          </div>
        </div>
      </FormProvider>
    </AuthLayout>
  );
};

export default ConfirmCodeView;
