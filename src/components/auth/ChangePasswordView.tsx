import AuthLayout from "@/components/layouts/AuthLayout";
import FormProvider from "@/components/FormProvider";
import PrimaryButton from "@/components/PrimaryButton";
import React, { ReactNode } from "react";
import RHFTextField from "@/components/RHFTextField";
import useChangePassword, {
  DynamicChangePasswordFormField,
} from "@/hooks/useChangePassword";

const ChangePasswordView = (): ReactNode => {
  const { onSubmit, methods, fields, labelDict, placeholderDict } =
    useChangePassword();

  return (
    <AuthLayout title="Change password">
      <FormProvider
        onSubmit={onSubmit}
        methods={methods}
        className="w-full flex flex-col gap-4"
      >
        <RHFTextField
          name="newPassword"
          label="New Password"
          placeholder="Enter your new password"
          type="password"
          required
        />

        {fields.map((item) => (
          <RHFTextField
            key={item.id}
            name={(item as DynamicChangePasswordFormField)?.name}
            label={
              labelDict[
                (item as DynamicChangePasswordFormField)
                  ?.name as keyof typeof labelDict
              ]
            }
            placeholder={
              placeholderDict[
                (item as DynamicChangePasswordFormField)
                  ?.name as keyof typeof placeholderDict
              ]
            }
            required
          />
        ))}

        <div className="flex justify-end">
          <PrimaryButton type="submit">Change password</PrimaryButton>
        </div>
      </FormProvider>
    </AuthLayout>
  );
};

export default ChangePasswordView;
