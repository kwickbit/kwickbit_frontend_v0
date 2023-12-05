import { useState, useCallback } from "react";
import { useQueryQuickbookCurrencies, useMutationCreateCurrencyMapping } from "../integration";
import { CreateCurrencyMappingAPIProps, QuickbookCurrenciesAPIResult } from "@/services/integrations";
import { toast } from "react-toastify";

export interface UseIntegrationSettingsModalReturnProps {
    saving: boolean;
    quickbookCurrencies: QuickbookCurrenciesAPIResult | undefined;
     isLoading: boolean;
     isError: boolean;
     onSave: (props: CreateCurrencyMappingAPIProps) => void;
}

const useIntegrationSettingsModal = (): UseIntegrationSettingsModalReturnProps => {
    const [saving, setSaving] = useState(false);
    const { data, isLoading, isError } = useQueryQuickbookCurrencies();
    const create = useMutationCreateCurrencyMapping();

    const onSave = useCallback((props: CreateCurrencyMappingAPIProps):void => {
        setSaving(true);
        create.mutate(
                props,
                {
                    onSuccess: (data) => {
                      toast.success(data?.message ?? "Created the currency mapping successfully");
                      setSaving(false);
                    },
                    onError: (error) => {
                      toast.error(error?.message ?? "Error while creating the currency mapping");
                      setSaving(false);
                    },
                  }                
            )
    },[])

    return {
        saving,
        quickbookCurrencies: data,
        isLoading,
        isError,
        onSave
    }
}

export default useIntegrationSettingsModal;