import { ReactNode } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";

const SignupSuccessView = (): ReactNode => {
  return (
    <AuthLayout title="Signup">
      <div className="flex justify-start flex-col text-lg">
        <p>Thanks for signing up with us.</p>
        <p className="mt-4">
          We&apos;ve sent a <strong>confirmation link</strong> to your email
          address.
        </p>
        <p>
          Please check your inbox to <strong>activate your account</strong>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignupSuccessView;
