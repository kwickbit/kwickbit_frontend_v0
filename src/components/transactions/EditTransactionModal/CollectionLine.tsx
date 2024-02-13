import Select from "@/components/common/Select";
import {AccountingLine, AccountingTransactionType, Direction, TransactionProps} from "@/services/transactions";
import {CircleMinus} from "../../common/AppIcon";
import React, {ReactNode, useEffect, useMemo, useState} from "react";
import {useQuickBooksData} from "@/hooks/useQuickBooksDataProvider";
import {AvailableAccount} from "@/services/integrations/quickbooks";
import {Bill, Invoice, Item} from "@/components/integrations";
import {convertCurrency, Token} from "@/services/token_currencies_conversions";
import {useTokenMappingContext} from "@/hooks/useTokenMappingsDataProvider";
import {keyFormatTransaction} from "@/lib/helpers";


interface Props {
  colIdx: number;
  transaction: TransactionProps; // Assuming this includes the status and possibly other details
  accountingLine: AccountingLine; // Current line item's accounting transaction details
  updateLine: (colIdx: number, updatedTransaction: AccountingLine) => void; // Function to update an accounting transaction
  handleDeleteLine: (colIdx: number) => void; // Function to delete an accounting transaction
  accountingTypeOptions: AccountingTransactionType[];
  token: Token;
  tokenSymbol: string;
}


const CollectionLine = ({
  colIdx,
  transaction,
  accountingLine,
  updateLine,
  handleDeleteLine,
  accountingTypeOptions,
  token,
  tokenSymbol,
}: Props): React.JSX.Element => {
  const [accountingType, setAccountingType] = useState<AccountingTransactionType | null>(accountingLine.accountingType !== undefined ? accountingLine.accountingType : null);
  const {items: {data: items}, invoices: {data: invoices}, accounts: {data: accounts}, bills: {data: bills}} = useQuickBooksData();
  const [resourcesOptions, setResourcesOptions] = useState<Invoice[] | Bill[] | AvailableAccount[] | Item[]>([]);
  const [resourceSelected, setResourceSelected] = useState<Invoice | Bill | AvailableAccount | Item | null>(null);
  const [amount, setAmount] = useState<number>((accountingLine.accountingType !== undefined) ? ([AccountingTransactionType.Income, AccountingTransactionType.Invoice, AccountingTransactionType.Swap].includes(accountingLine.accountingType) ? accountingLine.amountIncoming as number || 0 : accountingLine.amountOutgoing as number || 0) : 0);
  const {currencyMappings: {data: currencyMappings}} = useTokenMappingContext();
  const isSwap = useMemo<boolean>(() => transaction.direction === Direction.Swap, [transaction]);

  useEffect(() => {
    setResourceSelected(null);
    setAmount(0);
    switch (accountingType) {
      case AccountingTransactionType.Invoice:
        setResourcesOptions(invoices);
        break;
      case AccountingTransactionType.Bill:
        setResourcesOptions(bills);
        break;
      case AccountingTransactionType.Income:
        setResourcesOptions(items.filter(item => item.itemType === 'Service' || item.itemType === 'Inventory'));
        break;
      case AccountingTransactionType.Expense:
        setResourcesOptions(accounts.filter(account => account.accountType === 'Expense' || account.accountType === 'OtherExpense'));
        break;
      case AccountingTransactionType.Swap: {
        const currencyMapping = currencyMappings.find(currencyMapping => keyFormatTransaction(currencyMapping.token) === keyFormatTransaction(token));
        setResourcesOptions(accounts.filter(account => currencyMapping !== undefined && account.currencyRef.reference === currencyMapping?.integrationRef?.bank?.currencyRef.reference &&
            account.accountType === 'Bank'
        ));
        break;
      }
      case null:
        break;
      default:
        throw new Error('Illegal accountType option');
    }
  }, [colIdx, accountingType, accounts, bills, invoices, items, currencyMappings, transaction.tokenIncoming, transaction.tokenOutgoing, token]);

  const handleChangeAccountingType = (selectedAccountingType: AccountingTransactionType | null): void => {
    const updatedTransaction = {...accountingLine, ...(selectedAccountingType ? {accountingType: selectedAccountingType} : {})};
    updateLine(colIdx, updatedTransaction);
    setAccountingType(selectedAccountingType);
  };

  const handleChangeResourceSelected = (selectedResource: Invoice | Bill | AvailableAccount | Item | null): void => {
    let resourceRef = '';
    let resourceName = '';
    if ((selectedResource as Invoice)?.invoiceId !== undefined) {
      resourceRef = (selectedResource as Invoice).invoiceId;
      resourceName = `Invoice: ${resourceRef};`
    } else if ((selectedResource as Bill)?.billId !== undefined) {
      resourceRef = (selectedResource as Bill).billId;
      resourceName = `Bill: ${resourceRef}`;
    } else if ((selectedResource as AvailableAccount)?.accountType !== undefined) {
      resourceRef = (selectedResource as AvailableAccount).id;
      resourceName = (selectedResource as AvailableAccount).name;
    } else if ((selectedResource as Item)?.itemType !== undefined) {
      resourceRef = (selectedResource as Item).id;
      resourceName = (selectedResource as Item).name;
    }

    const updatedTransaction = {...accountingLine, ...(selectedResource ? {resource: {name: resourceName, reference: resourceRef}} : {})};
    updateLine(colIdx, updatedTransaction);
    setResourceSelected(selectedResource);
  };

  const handleChangeResourceAmount = (value: string): void => {
    const amount = parseFloat(value) || 0;
    const priceInFiat = {
      amount: String(convertCurrency({from: token, to: {reference: 'USD'}, fromAmount: amount})),
      reference: 'USD',
    };
    const updatedTransaction = { ...accountingLine, amount, priceInFiat };
    updateLine(colIdx, updatedTransaction);
    setAmount(amount);
  };

  // Function to render the label based on the type
  const renderLabelResource = (value: Invoice | Bill | AvailableAccount | Item | null): ReactNode => {
    if ((value as Invoice)?.invoiceId !== undefined) return `Invoice: ${(value as Invoice).integrationInvoiceId}`;
    else if ((value as Bill)?.billId !== undefined) return `Bill: ${(value as Bill).integrationBillId}`;
    else if ((value as AvailableAccount)?.accountType !== undefined) return `(${(value as AvailableAccount).currencyRef.reference}) - Account: ${(value as AvailableAccount).name}`;
    else if ((value as Item)?.itemType !== undefined) return `(${(value as Item).itemType}) - ${(value as Item).name}`;
    else if (value === null) return null;
    else throw Error('Resource value can only be of type Invoice | Bill | AvailableAccount');
  };

  const renderLabelAccountingType = (value: AccountingTransactionType | null): ReactNode => {
    return value;
  }

  return (
    <div className="grid grid-cols-[1fr,1.1fr,1fr,28px] gap-1">
      <div className="flex items-center">
        {transaction.status === 'Published' || isSwap ? (
          <span className="bg-[#F3F4F6] text-sm text-[#565D6D] rounded-2xl py-2 px-3 w-full">
            {accountingLine.accountingType}
          </span>
        ) : (
          <Select
            selected={accountingType}
            setSelected={handleChangeAccountingType}
            options={accountingTypeOptions}
            renderLabel={renderLabelAccountingType}
          />
        )}
      </div>
      <div className="flex items-center">
        {transaction.status === 'Published' ? (
          <span className="bg-[#F3F4F6] text-sm text-[#565D6D] rounded-2xl py-2 px-3 w-full">
            {accountingLine.resource?.name}
          </span>
        ) : (
          <Select
            selected={resourceSelected}
            setSelected={handleChangeResourceSelected}
            options={resourcesOptions}
            renderLabel={renderLabelResource}
          />
        )}
      </div>
      <div className="flex items-center">
        {transaction.status === 'Published' ? (
          <span className="bg-[#F3F4F6] text-sm text-[#565D6D] rounded-2xl py-2 px-3 w-full">
            {[AccountingTransactionType.Income, AccountingTransactionType.Invoice, AccountingTransactionType.Swap].includes(accountingLine.accountingType as AccountingTransactionType) ? accountingLine.amountIncoming || accountingLine.amount : accountingLine.amountOutgoing || accountingLine.amount}
          </span>
        ) : (
          <div className="relative rounded-xl bg-[#F3F4F6] text-[#565D6D] text-xs py-2 grid grid-cols-[1fr,37px] px-2">
            <input
              className="appearance-none w-full h-full bg-[#F3F4F6] focus-visible:outline-none"
              type="number"
              min={0}
              value={amount}
              onChange={(e): void => handleChangeResourceAmount(e.currentTarget.value)}
            />
            <p className="pl-1">{tokenSymbol}</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center">
        {(transaction.status === 'NonPublished' && !isSwap) && (
          <button
            className="flex items-center justify-center"
            onClick={(): void => handleDeleteLine(colIdx)}
          >
            <CircleMinus />
          </button>
        )}
      </div>
    </div>
  );
};

export default CollectionLine;
