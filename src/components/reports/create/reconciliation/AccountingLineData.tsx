import { AccountingLine } from "@/services/transactions";

interface Props {
  line: AccountingLine;
}

export const AccountingLineData = ({ line }: Props): React.JSX.Element => {
  return (
    <>
      {line.accountingType && line.amount ? (
        <>
          {line?.resource && <p>{line.resource.name} (Ref: {line.resource.reference})</p>}
          <p>{line.accountingType}: {line.amount} (token) ({line.priceInFiat?.amount} {line.priceInFiat?.reference})</p>
        </>) :
        <p>Transaction has insufficient data to display</p>
      }
    </>
  );
};
