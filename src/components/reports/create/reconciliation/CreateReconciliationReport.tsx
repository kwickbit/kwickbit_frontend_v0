import { ReactNode } from "react";
import { useQueryTransactions } from "@/hooks/reports";
import Loader from "@/components/Loader";
import ServerError from "@/components/ServerError";
import { ReconciliationTransactionList } from "./ReconciliationTransactionList";

export const CreateReconciliationReport = (): ReactNode => {
  const { data, isLoading, isError } = useQueryTransactions();

  if (isLoading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <ServerError />;
  }

  const transactions = data?.data ?? [];

  return (
    <>
      <span className="text-base text-[#21254E] mx-16">You have {transactions.length ?? "no"} unreconciled transactions.</span>
      <ReconciliationTransactionList transactions={transactions} />
    </>
  );
};
