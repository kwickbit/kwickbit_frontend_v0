import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {PublishTransactionsToIntegrationArgs, publishTransactionToIntegration} from "@/services/transactions";


export const useMutationPublishTransaction = (): UseMutationResult<
    any,
    Error,
    PublishTransactionsToIntegrationArgs,
    unknown
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['publish-transaction'],
        mutationFn: publishTransactionToIntegration,
        onSuccess: (submittedSuccessfully) => {
            toast.success(submittedSuccessfully ?? "Submitted publish transaction");
            queryClient.invalidateQueries({ queryKey: ['publish-transaction'] });
        },
        onError: (error) => {
            toast.error(error?.message ?? "Error while submitting publish transaction");
        },
    });
};
