import { useQueryTransactions } from "@/hooks/transactions";
import Loader from "../Loader";
import ServerError from "../ServerError";
import TransactionSelectSection from "./SelectSection";
import TransactionListSection from "./TransactionListSection";

const TransactionsView = (): JSX.Element => {
  const { data, isLoading, isError, refetch } = useQueryTransactions();
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

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4">
        <div className="overflow-x-auto ">
            <div className="w-fit">
                <TransactionSelectSection />
                <TransactionListSection
                    transactions={data?.transactions}
                    onRefresh={refetch}
                />
            </div>
        </div>
    </div>
  );
};

export default TransactionsView;
