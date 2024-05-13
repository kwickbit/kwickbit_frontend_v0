import type { BaseSyntheticEvent } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutationCreateAPIKey } from "@/hooks/apiKeys";

interface ReturnProps {
  submitForm: (event?: BaseSyntheticEvent) => Promise<void>;
  methods: UseFormReturn<{ expiresInWeeks: string }>;
}

export const useCreateAPIKeyModal = (): ReturnProps => {
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
        },
        onError: (error: any) => {
          toast.error(error?.message ?? "Error while creating API key.");
        },
      }
    );
  });

  return { submitForm, methods };
};
