/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import RHFTextField from "@/components/RHFTextField";
import FormProvider from "@/components/FormProvider";
import Link from "next/link";
import Logo from "@/components/Logo";
import PrimaryButton from "@/components/PrimaryButton";
import useLogin from "@/hooks/useLogin";

const LoginView = (): ReactNode => {
  const { methods, onSubmit, login } = useLogin();

  return (
    <div className="grid grid-cols-12 h-screen">
      <FormProvider
        methods={methods}
        onSubmit={onSubmit}
        className="col-span-12 lg:col-span-7 flex justify-center sm:p-12 p-4"
      >
        <div className="flex flex-col items-center gap-4 max-w-[450px] w-full">
          <Logo className="max-w-[300px] w-full pb-12" />
          <h2 className="text-4xl font-bold  pb-8">Login</h2>

          <RHFTextField name="username" label="Username (or Email)" />
          <RHFTextField name="password" label="Password" type="password" />
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
        </div>
      </FormProvider>

      <div className="col-span-5 hidden lg:block">
        <img
          src="/assets/auth/auth-img.png"
          alt="auth"
          className=" object-cover h-full w-full max-h-screen"
        />
      </div>
    </div>
  );
};

export default LoginView;
