import { ReactNode } from "react";
import AuthLayout from "./AuthLayout";
import FormProvider from "@/components/FormProvider";
import Link from "next/link";
import PrimaryButton from "@/components/PrimaryButton";
import RHFTextField from "@/components/RHFTextField";
import useSignup from "@/hooks/useSignup";

const SignupView = (): ReactNode => {
  const { methods, onSubmit, signup } = useSignup();

  return (
    <AuthLayout title="Signup">
      <FormProvider
        methods={methods}
        onSubmit={onSubmit}
        className="w-full flex flex-col gap-4"
      >
        <RHFTextField name="givenName" label="First name" placeholder="John" />
        <RHFTextField
          name="familyName"
          label="Family name"
          placeholder="Smith"
        />
        <RHFTextField name="address" label="Address" placeholder="Street 123" />
        <RHFTextField
          name="email"
          label="Email"
          placeholder="example@email.com"
        />
        <RHFTextField name="username" label="Username" placeholder="Username" />
        <RHFTextField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter at least 8+ characters"
        />

        <p className="text-right w-full mt-2 sm:text-base text-sm">
          {"Already have an account?"}{" "}
          <Link href="/login" className="underline">
            Login here
          </Link>
        </p>
        <div className="flex justify-end w-full mt-2">
          <PrimaryButton type="submit" isLoading={signup.isPending}>
            Singup
          </PrimaryButton>
        </div>
      </FormProvider>
    </AuthLayout>
  );
};

export default SignupView;
