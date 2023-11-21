import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FaEyeSlash, FaEye } from "react-icons/fa6";

interface Props {
  name: string;
  label: string;
  type?: string;
  [x: string]: any;
}

const RHFTextField = ({
  name,
  label,
  type = "text",
  ...rest
}: Props): React.JSX.Element => {
  const { control } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = (): void => setShowPassword((prev) => !prev);

  const PasswordEyeIcon = showPassword ? FaEye : FaEyeSlash;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }): React.ReactElement => (
        <div className="w-full">
          <div className="bg-[#F3F4F6FF] flex flex-col px-4 py-2 rounded w-full">
            <label className="font-semibold">{label}</label>
            <div className="flex justify-between items-center gap-2">
              <input
                className="bg-transparent  outline-none w-full"
                type={showPassword ? "text" : type}
                {...field}
                {...rest}
              />
              {type === "password" && (
                <PasswordEyeIcon
                  className="cursor-pointer"
                  onClick={toggleShowPassword}
                />
              )}
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
      )}
    />
  );
};

export default RHFTextField;
