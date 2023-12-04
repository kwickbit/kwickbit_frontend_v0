import { ReactNode } from "react";
import Logo from "@/components/Logo";
import Image from "next/image";

interface Props {
  children: ReactNode;
  title: string;
}

const AuthLayout = ({ children, title }: Props): ReactNode => {
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-12 lg:col-span-7 flex justify-center sm:p-12 p-4">
        <div className="flex flex-col items-center gap-4 max-w-[450px] w-full">
          <Logo className="max-w-[300px] w-full pb-12" />
          <h2 className="text-4xl font-bold  pb-8">{title}</h2>
          {children}
        </div>
      </div>

      <div className="col-span-5 hidden lg:block">
        <Image
          src="/assets/auth/auth-img.png"
          alt="auth"
          className=" object-cover h-full w-full"
          width={950}
          height={1300}
        />
      </div>
    </div>
  );
};

export default AuthLayout;
