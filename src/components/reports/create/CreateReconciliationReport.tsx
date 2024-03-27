import { ReactNode } from "react";
import { useQueryTransactions } from "@/hooks/reports";
import { TransactionProps } from "@/services/transactions";
import Loader from "@/components/Loader";
import ServerError from "@/components/ServerError";

const CreateReconciliationReport = (): ReactNode => {
  const { data, isLoading, isError } = useQueryTransactions()

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

  const transactions = data?.data ?? []

  const displayTransaction = (transaction: TransactionProps, index: number): React.JSX.Element => (
    // Later, when the transaction is complete, we'll have some better key here
    <div key={index} className="mb-2">
      <li
        className="outline-none border border-gray-500 py-3 px-3 w-full rounded-md col-span-5"
      >
        Txn {transaction?.hash ?? "(no hash)"}: {transaction.amountIncoming ?? 0} in, {transaction.amountOutgoing ?? 0} out, with {transaction.accountingLines?.length ?? "no"} accounting lines.
      </li>
    </div>
  )

  return (
    <>
      <span className="text-base text-[#21254E] mx-12">You have {transactions.length ?? "no"} unreconciled transactions.</span>
      <div className="col-span-1 flex items-center gap-8 mx-12 my-6">
        <ul>
          {transactions.map(displayTransaction)}
        </ul>
      </div>
    </>
  )
}

export default CreateReconciliationReport
