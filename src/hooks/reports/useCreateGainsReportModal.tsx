import { type BaseSyntheticEvent, useState } from "react";
import type {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useMutationCreateGainsReport } from "@/hooks/reports/gains";
import type {
  CreateGainsReportAPIProps,
  CreateGainsReportAPIResult,
  ProvidedCosts
} from "@/services/reports/gains";
import { type Chain } from "@/services/transactions";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";

interface ReturnProps {
  addAsset: () => void;
  assetCount: number;
  errors: FieldErrors<CreateGainsReportAPIProps>;
  getValues: UseFormGetValues<CreateGainsReportAPIProps>;
  register: UseFormRegister<CreateGainsReportAPIProps>;
  removeAsset: (index: number) => void;
  setValue: UseFormSetValue<CreateGainsReportAPIProps>;
  submitForm: (event?: BaseSyntheticEvent) => Promise<void>;
  watch: UseFormWatch<CreateGainsReportAPIProps>;
}

const currentDate = new Date();
const startOfYear = new Date(Date.UTC(currentDate.getFullYear(), 0, 1, 12));

const defaultAsset = {
  asset: {
    isNative: true,
    chain: "stellar" as Chain,
    assetType: "native",
    assetMetadata: {
      code: "XLM",
      issuer: "Stellar",
    }
  },
  fifo: 1,
  lifo: 1,
  hifo: 1,
  tokenBalance: 1,
};

const reportProps = (): CreateGainsReportAPIProps => ({
  deduplicationId: uuidv4(),
  batchId: uuidv4(),
  totalJobsCount: 4,
  transactionsStartDate: startOfYear.toISOString().split("T")[0],
  transactionsEndDate: currentDate.toISOString().split("T")[0],
  providedCosts: [defaultAsset],
});

export const useCreateGainsReportModal = (): ReturnProps => {
  const [assetCount, setAssetCount] = useState(1);
  const createNewGainsReport = useMutationCreateGainsReport();

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: reportProps(),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const addAsset = (): void => {
    const values = getValues('providedCosts');
    const hasNativeAsset = values.some(costsItem => costsItem.asset.isNative);

    setValue('providedCosts', [
      ...values,
      {
        ...defaultAsset,
        asset: {
          isNative: false,
          chain: "stellar" as Chain,
          assetType: hasNativeAsset ? "stablecoin" : "native",
          assetMetadata: {
            code: hasNativeAsset ? "" : "XLM",
            issuer: hasNativeAsset ? "" : "Stellar"
          }
        },
      }
    ]);

    setAssetCount(prevCount => prevCount + 1);
  };

  const removeAsset = (index: number): void => {
    setAssetCount(prevCount => Math.max(1, prevCount - 1));
    // Remove the asset from the form data
    const newProvidedCosts = getValues().providedCosts.filter((_, i) => i !== index);
    setValue('providedCosts', newProvidedCosts);
  };

  const submitForm = handleSubmit((reportData: CreateGainsReportAPIProps): void => {
    const prepareCostsData = (costsItem: ProvidedCosts): ProvidedCosts => ({
      ...costsItem,
      asset: {
        ...costsItem.asset,
        assetType: costsItem.asset.isNative ? "native" : "stablecoin",
        ...(costsItem.asset.isNative ? {} : { assetMetadata: costsItem.asset.assetMetadata })
      }
    });

    const preparedData = {
      ...reportData,
      providedCosts: reportData.providedCosts.map(prepareCostsData)
    };

    setAssetCount(1);
    reset(reportProps());

    const options = {
      onSuccess: (data: CreateGainsReportAPIResult): void => {
        toast.success(data?.message ?? "Gains report requested.");
      },
      onError: (error: AxiosError<any>): void => {
        toast.error(error?.response?.data.error ?? "Error while requesting gains report.");
      },
    };

    createNewGainsReport.mutate(preparedData, options);
  });

  return {
    addAsset,
    assetCount,
    errors,
    getValues,
    register,
    removeAsset,
    setValue,
    submitForm,
    watch,
  };
};
