import { ReactNode } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import FormProvider from "@/components/FormProvider";
import PrimaryButton from "@/components/PrimaryButton";
import RHFTextField from "@/components/RHFTextField";
import useChangePassword from "@/hooks/useChangePassword";

const ChangePasswordView = (): ReactNode => {
  const { onSubmit, methods, labelDict, placeholderDict, addedKeys } =
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

        {addedKeys?.map((key, idx) => (
          <RHFTextField
            key={idx}
            name={key}
            label={labelDict[key as keyof typeof labelDict]}
            placeholder={placeholderDict[key as keyof typeof placeholderDict]}
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
