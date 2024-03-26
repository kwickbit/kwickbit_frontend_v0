import { BaseSyntheticEvent } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { UseBooleanReturnProps } from "@/hooks/useBoolean";

enum ReportType {
  Reconciliation = "Reconciliation"
}

interface Props {
  createReport: UseBooleanReturnProps;
}

interface ReturnProps {
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  methods: UseFormReturn<any, any, undefined>;
  reportTypes: ReportType[]
}

const useCreateReportModal = ({ createReport }: Props): ReturnProps => {
  const reportTypes = ["Reconciliation"] as ReportType[]

  // Mock transactions; later, these will be mapped from state
  const transactions = [
    "paid 100 XLM to John for lunch",
    "received 50 XLM from Alice for concert tickets",
    "paid 20 XLM to Bob for coffee",
  ]

  const methods = useForm({
    defaultValues: {
      reportType: reportTypes[0],
      transactions
    }
  });

  // Placeholder for form submission logic
  const onSubmit = methods.handleSubmit((data) => {
    console.log('Form submitted: ', data);
    createReport.onFalse();
    // Here, we will later send data to the backend
  });

  return {
    onSubmit,
    methods,
    reportTypes,
  };
};

export default useCreateReportModal;
