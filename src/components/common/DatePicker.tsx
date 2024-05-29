import { type CreateGainsReportAPIProps } from "@/services/reports/gains";
import { type SetStateAction } from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface Props<T extends FieldValues> {
  className?: string;
  label: string;
  inputId: string;
  value?: string;
  onChangeCallback?: (value: SetStateAction<string>) => void;
  register?: UseFormRegister<T>,
  validate?: (value: string, formValues: CreateGainsReportAPIProps) => boolean;
}

export const DatePicker = <T extends FieldValues>({
  className,
  label,
  inputId,
  value,
  onChangeCallback,
  register,
  validate,
}: Props<T>): JSX.Element => {
  const registerOptions: any = { required: true };

  if (validate) {
    registerOptions.validate = validate;
  }

  const inputProps = register ? register(inputId as Path<T>, registerOptions) : {};

  return <div className={`flex flex-col flex-1 ${className}`}>
    <label htmlFor={inputId} className="mb-2">{label}</label>
    <input
      className="border-2 rounded-md p-2"
      type="date"
      value={value || (inputProps as { value?: string })?.value || ''}
      id={inputId}
      {...inputProps}
      {...(onChangeCallback && { onChange: (event): void => onChangeCallback(event.target.value) })}
    />
  </div>
};
