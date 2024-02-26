import { ReactNode } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import Link from "next/link";

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
        <p className="text-right w-full mt-2 sm:text-base text-sm">
          <Link href="/login" className="underline">
            Return to login page and enter your credentials (you will be asked after to enter code received by email)
          </Link>
        </p>
      </AuthLayout>
  );
};

export default SignupSuccessView;
