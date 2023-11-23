import { ReactNode } from "react";
import RHFTextField from "@/components/RHFTextField";
import FormProvider from "@/components/FormProvider";
import Link from "next/link";
import PrimaryButton from "@/components/PrimaryButton";
import useLogin from "@/hooks/useLogin";
import AuthLayout from "../layouts/AuthLayout";

const LoginView = (): ReactNode => {
  const { methods, onSubmit, login } = useLogin();

  return (
    <AuthLayout title="Login">
      <FormProvider
        methods={methods}
        onSubmit={onSubmit}
        className="w-full flex flex-col gap-4"
      >
        <RHFTextField
          name="username"
          label="Username (or Email)"
          placeholder="John56"
        />
        <RHFTextField
          name="password"
          label="Password"
          type="password"
          placeholder="***"
        />
        <p className="text-right w-full mt-2 sm:text-base text-sm">
          {"Don't have an account?"}{" "}
          <Link href="/signup" className="underline">
            Signup here.
          </Link>
        </p>
        <div className="flex justify-end w-full mt-2">
          <PrimaryButton type="submit" isLoading={login.isPending}>
            Login
          </PrimaryButton>
        </div>
      </FormProvider>
    </AuthLayout>
  );
};

export default LoginView;
