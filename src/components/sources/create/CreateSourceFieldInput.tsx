import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  [x: string]: any;
}

const CreateSourceFieldInput = ({ name, label, ...rest }: Props): ReactNode => {
  const { register } = useFormContext();
  return (
    <div>
      <label className="block font-semibold mb-1 text-lg">{label}</label>
      <input
        type="text"
        {...register(name)}
        className="outline-none border border-gray-500 rounded-md py-3 px-3 w-full"
        {...rest}
      />
    </div>
  );
};

export default CreateSourceFieldInput;
