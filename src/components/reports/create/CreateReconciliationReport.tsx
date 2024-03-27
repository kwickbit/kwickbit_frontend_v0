import { ReactNode } from "react";

const CreateReconciliationReport = (): ReactNode => {

  // Mock transactions; later, these will be mapped from state
  const transactions = [
    "paid 100 XLM to John for lunch",
    "received 50 XLM from Alice for concert tickets",
    "paid 20 XLM to Bob for coffee",
  ]

  const displayTransaction = (transaction: string, index: number): React.JSX.Element => (
    // Later, when the transaction is complete, we'll have some better key here
    <div key={index} className="mb-2">
      <li
        className="outline-none border border-gray-500 py-3 px-3 w-full rounded-md col-span-5"
      >
        {transaction}
      </li>
    </div>
  )

  return (
    <>
      <span className="text-base text-[#21254E] mx-12">You have {transactions.length} unreconciled transactions.</span>
      <div className="col-span-1 flex items-center gap-8 mx-12 my-6">
        <ul>
          {transactions.map(displayTransaction)}
        </ul>
      </div>
    </>
  )
}

export default CreateReconciliationReport
