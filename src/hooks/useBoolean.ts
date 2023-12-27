import { useState } from "react";

export interface UseBooleanReturnProps {
  value: boolean;
  onTrue: () => void;
  onFalse: () => void;
  onToggle: () => void;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useBoolean(defaultValue?: boolean): UseBooleanReturnProps {
  const [value, setValue] = useState(!!defaultValue);

  const onTrue = (): void => {
    setValue(true);
  };

  const onFalse = (): void => {
    setValue(false);
  };

  const onToggle = (): void => {
    setValue((prev) => !prev);
  };

  return {
    value,
    onTrue,
    onFalse,
    onToggle,
    setValue,
  };
}
