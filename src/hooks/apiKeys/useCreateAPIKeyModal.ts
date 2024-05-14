import type { BaseSyntheticEvent, Dispatch, SetStateAction } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutationCreateAPIKey } from "@/hooks/apiKeys";
import { UseBooleanReturnProps } from "@/hooks/useBoolean";

interface Props {
  shouldShowNewAPIKey: UseBooleanReturnProps;
  setNewAPIKey: Dispatch<SetStateAction<string>>;
}

interface ReturnProps {
  submitForm: (event?: BaseSyntheticEvent) => Promise<void>;
  methods: UseFormReturn<{ expiresInWeeks: string }>;
}

export const useCreateAPIKeyModal = ({
  shouldShowNewAPIKey,
  setNewAPIKey,
}: Props): ReturnProps => {
  const postNewAPIKey = useMutationCreateAPIKey();

  const methods = useForm({
    defaultValues: {
      expiresInWeeks: "4",
    }
  });

  const { handleSubmit } = methods;

  const submitForm = handleSubmit(({ expiresInWeeks }) => {
    const newAPIKey = { expiresInWeeks: parseInt(expiresInWeeks) };
    postNewAPIKey.mutate(
      newAPIKey,
      {
        onSuccess: (data: any) => {
          toast.success(data?.message ?? "API key created successfully.");
          setNewAPIKey(data.apiKey)
          shouldShowNewAPIKey.onTrue();
        },
        onError: (error: any) => {
          toast.error(error?.message ?? "Error while creating API key.");
        },
      }
    );
  });

  return { submitForm, methods };
};
