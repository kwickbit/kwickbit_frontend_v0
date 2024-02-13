import {useBoolean, UseBooleanReturnProps} from "@/hooks/useBoolean";
import {
  AccountingLine,
  AccountingTransactionType,
  Direction,
  PublishTransactionsToIntegrationArgs,
  TransactionProps,
} from "@/services/transactions";
import RightModal from "../../RightModal";
import {YellowWarning} from "../../common/AppIcon";
import BlockchainFee from "./BlockchainFee";
import BlockchainTransDescription from "./BlockchainTransDescription";
import EditTransactionModalHeader from "./header";
import EditTransactionModalFooter from "./footer";
import React, {useCallback, useMemo, useState} from "react";
import {CurrencyMapping} from "@/services/integrations/quickbooks";
import CommonWarningAlert from "@/components/common/WarningAlert";
import cn from "classnames";
import {formatNumberDigits, keyFormatTransaction} from "@/lib/helpers";
import {reactNodeFormatterTransaction} from "@/lib/react-node-formatters";
import {useMutationPublishTransaction} from "@/hooks/transactions";
import {computeDeduplicationId} from "@/utils/utils";
import {v4 as uuidv4} from "uuid";
import {Token} from "@/services/token_currencies_conversions";
import {AccountingLines} from "@/components/transactions/EditTransactionModal/AccountingLines";

interface Props {
  editTransaction: UseBooleanReturnProps;
  transaction: TransactionProps | undefined;
  nonSetMappings: CurrencyMapping[];
}

const initializeAccountingLinesIncoming = (transaction: TransactionProps): AccountingLine[] => {
  if (transaction.direction === Direction.Swap) {
    const accountingLinesSwapIn = transaction?.accountingLines?.filter(accountingLine => accountingLine.accountingType && AccountingTransactionType.Swap === accountingLine.accountingType);
    if (!accountingLinesSwapIn || accountingLinesSwapIn.length === 0) return [{accountingType: AccountingTransactionType.Swap}];
    else return accountingLinesSwapIn;
  } else return transaction?.accountingLines?.filter(accountingLine => accountingLine.accountingType && [AccountingTransactionType.Income, AccountingTransactionType.Invoice].includes(accountingLine.accountingType));
};

const initializeAccountingLinesOutgoing = (transaction: TransactionProps): AccountingLine[] => {
  if (transaction.direction === Direction.Swap) {
    const accountingLinesSwapOut = transaction?.accountingLines?.filter(accountingLine => accountingLine.accountingType && AccountingTransactionType.Swap === accountingLine.accountingType);
    if (!accountingLinesSwapOut || accountingLinesSwapOut.length === 0) return [{accountingType: AccountingTransactionType.Swap}];
    else return accountingLinesSwapOut;
  } else return transaction?.accountingLines?.filter(accountingLine => accountingLine.accountingType && [AccountingTransactionType.Expense, AccountingTransactionType.Bill].includes(accountingLine.accountingType));
};

const EditTransactionModal = ({
  editTransaction,
  transaction,
  nonSetMappings,
}: Props): React.JSX.Element => {
  const [accountingLinesIncoming, setAccountingLinesIncoming] = useState<AccountingLine[]>(initializeAccountingLinesIncoming(transaction as TransactionProps));
  const [accountingLinesOutgoing, setAccountingLinesOutgoing] = useState<AccountingLine[]>(initializeAccountingLinesOutgoing(transaction as TransactionProps));
  const showMismatchAmount = useBoolean(false);
  const publishTransactionMutation = useMutationPublishTransaction();

  const handleAddNewLineIncoming = (): void => {
    const newLine: AccountingLine = {
      amountIncoming: 0,
      priceInFiatIncoming: {
        amount: "0",
        reference: "USD",
      },
    };
    setAccountingLinesIncoming([...accountingLinesIncoming, newLine]);
  };

  const handleAddNewLineOutgoing = (): void => {
    const newLine: AccountingLine = {
      amountOutgoing: 0,
      priceInFiatOutgoing: {
        amount: "0",
        reference: "USD",
      },
    };
    setAccountingLinesOutgoing([...accountingLinesOutgoing, newLine]);
  };

  const updateLineIncoming = useCallback((index: number, updatedLine: AccountingLine): void => {
    const updatedLines = [...accountingLinesIncoming];
    updatedLines[index] = updatedLine;
    setAccountingLinesIncoming(updatedLines);
  }, [accountingLinesIncoming]);

  const updateLineOutgoing = useCallback((index: number, updatedLine: AccountingLine): void => {
    const updatedLines = [...accountingLinesOutgoing];
    updatedLines[index] = updatedLine;
    setAccountingLinesOutgoing(updatedLines);
  }, [accountingLinesOutgoing]);

  const handleDeleteLineIncoming = useCallback((index: number): void => {
    const updatedLines = accountingLinesIncoming.filter((_, lineIndex) => lineIndex !== index);
    setAccountingLinesIncoming(updatedLines);
  }, [accountingLinesIncoming]);

  const handleDeleteLineOutgoing = useCallback((index: number): void => {
    const updatedLines = accountingLinesOutgoing.filter((_, lineIndex) => lineIndex !== index);
    setAccountingLinesOutgoing(updatedLines);
  }, [accountingLinesOutgoing]);

  const closeWarningSumMismatch = useCallback((): void => {
    showMismatchAmount.onFalse();
  }, [showMismatchAmount]);

  const isTokenNonMapped = useMemo((): boolean => {
    const nonMappedTokens = nonSetMappings.filter(tokenMapping => tokenMapping.token.chain === transaction?.tokenIncoming?.chain || tokenMapping.token.chain === transaction?.tokenOutgoing?.chain)
      .map(tokenMapping => keyFormatTransaction(tokenMapping.token));
    if (transaction?.direction === Direction.Incoming) return nonMappedTokens.includes(keyFormatTransaction(transaction?.tokenIncoming as Token));
    else if (transaction?.direction === Direction.Outgoing) return nonMappedTokens.includes(keyFormatTransaction(transaction?.tokenOutgoing as Token));
    else if (transaction?.direction === Direction.Swap) {
      return nonMappedTokens.includes(keyFormatTransaction(transaction?.tokenIncoming as Token)) || nonMappedTokens.includes(keyFormatTransaction(transaction?.tokenOutgoing as Token));
    } else return false;
  }, [nonSetMappings, transaction]);

  const isSumMismatchedIncoming = useMemo((): boolean => {
    if ([Direction.Incoming, Direction.Swap].includes(transaction?.direction as Direction)) {
      return Math.abs(accountingLinesIncoming.map(accountingLine => accountingLine.amount as number).reduce((total, num) => total + num, 0) - parseFloat(transaction?.amountIncoming || '0')) > 0.5;
    } else return true;
  }, [accountingLinesIncoming, transaction?.amountIncoming, transaction?.direction]);

  const isSumMismatchedOutgoing = useMemo((): boolean => {
    if ([Direction.Outgoing, Direction.Swap].includes(transaction?.direction as Direction)) {
      return Math.abs(accountingLinesOutgoing.map(accountingLine => accountingLine.amount as number).reduce((total, num) => total + num, 0) - parseFloat(transaction?.amountOutgoing || '0')) > 0.5;
    } else return true;
  }, [accountingLinesOutgoing, transaction?.amountOutgoing, transaction?.direction]);

  const disabledPublish = useMemo((): boolean => {
    if (isTokenNonMapped) return true;

    if ([Direction.Incoming, Direction.Swap].includes(transaction?.direction as Direction)) {
      if (accountingLinesIncoming.some(accountingLine => accountingLine.accountingType === undefined || accountingLine.resource === undefined || accountingLine.amount === undefined)) {
        return true;
      }
    }

    if ([Direction.Outgoing, Direction.Swap].includes(transaction?.direction as Direction)) {
      if (accountingLinesOutgoing.some(accountingLine => accountingLine.accountingType === undefined || accountingLine.resource === undefined || accountingLine.amount === undefined)) {
        return true;
      }
    }

    return accountingLinesIncoming.length + accountingLinesOutgoing.length === 0
  }, [accountingLinesIncoming, accountingLinesOutgoing, isTokenNonMapped, transaction?.direction]);

  const publishTransaction = (): void => {
    if (isSumMismatchedIncoming || isSumMismatchedOutgoing) showMismatchAmount.onTrue();

    let accountingLines: AccountingLine[] = [];
    if (transaction?.direction === Direction.Incoming) {
      accountingLines = accountingLinesIncoming.map(accountingLine => ({
        ...accountingLine,
        resourceIncoming: accountingLine.resource,
        priceInFiatIncoming: accountingLine.priceInFiat,
        amountIncoming: accountingLine.amount,
      }));
    }
    else if (transaction?.direction === Direction.Outgoing) {
      accountingLines = accountingLinesOutgoing.map(accountingLine => ({
        ...accountingLine,
        resourceOutgoing: accountingLine.resource,
        priceInFiatOutgoing: accountingLine.priceInFiat,
        amountOutgoing: accountingLine.amount,
      }));
    }
    else if (transaction?.direction === Direction.Swap) {
      accountingLines = [{
        accountingType: AccountingTransactionType.Swap,
        resourceIncoming: accountingLinesIncoming[0].resource,
        resourceOutgoing: accountingLinesOutgoing[0].resource,
        priceInFiatIncoming: accountingLinesIncoming[0].priceInFiat,
        priceInFiatOutgoing: accountingLinesIncoming[0].priceInFiat,
        amountIncoming: accountingLinesIncoming[0].amount,
        amountOutgoing: accountingLinesOutgoing[0].amount,
      }];
    }

    const data: Omit<PublishTransactionsToIntegrationArgs, 'deduplicationId' | 'batchId'> = {
      accountingLines,
      integrationProvider: 'QuickBooks',
      atomicTransactionId: transaction?.atomicTransactionId as string,
      workspaceIdChainAddress: transaction?.workspaceIdChainAddress as string,
    };
    (data as PublishTransactionsToIntegrationArgs).deduplicationId = computeDeduplicationId(data);
    (data as PublishTransactionsToIntegrationArgs).batchId = uuidv4();
    publishTransactionMutation.mutate(data as PublishTransactionsToIntegrationArgs);
  };

  const fontColor = (direction: Direction): string => {
    switch (direction) {
      case Direction.Incoming:
        return 'text-[#4ADDB6]';
      case Direction.Outgoing:
        return 'text-[#ef5666]';
      default:
        return '';
    }
  }

  return (
    <RightModal
      modalClassNames="max-w-2xl max-h-[calc(100%-54px)]"
      show={editTransaction.value}
      closeModal={editTransaction.onFalse}
    >
      {transaction && (
          <div className="rounded pt-8 pb-11 px-7 border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-full overflow-y-auto">
            <EditTransactionModalHeader
              transaction={transaction as TransactionProps}
              editTransaction={editTransaction}
            />
            <CommonWarningAlert
              shouldShow={showMismatchAmount.value}
              message="The Total amount value if too much different from transaction amount. Please regulate the transaction values"
              onClose={closeWarningSumMismatch}
            />

            {[Direction.Outgoing, Direction.Swap].includes(transaction.direction) && (
                <div className="mb-4">
                  <h2
                      className={cn(
                          "text-lg font-bold  font-manrope",
                          fontColor(Direction.Outgoing),
                      )}
                  >
                    {`${formatNumberDigits(transaction?.amountOutgoing || '0', 6)}${transaction.detail?.symbolOutgoing} `}
                    <span className="capitalize">({transaction?.chain})</span>
                  </h2>
                  <p className="text-[#39BFF0] text-xs font-bold px-0.5">{`${transaction?.detail?.priceInFiatOutgoing?.symbol}${formatNumberDigits(transaction?.detail?.priceInFiatOutgoing?.amount || '', 2)}`}</p>
                </div>
            )}
            {[Direction.Incoming, Direction.Swap].includes(transaction.direction) && (
                <div className="mb-4">
                  <h2
                      className={cn(
                          "text-lg font-bold  font-manrope",
                          fontColor(Direction.Incoming),
                      )}
                  >
                    {`${formatNumberDigits(transaction?.amountIncoming || '0', 6)}${transaction.detail?.symbolIncoming} `}
                    <span className="capitalize">({transaction?.chain})</span>
                  </h2>
                  <p className="text-[#39BFF0] text-xs font-bold px-0.5">{`${transaction?.detail?.priceInFiatIncoming?.symbol}${formatNumberDigits(transaction?.detail?.priceInFiatIncoming?.amount || '', 2)}`}</p>
                </div>
            )}

            <BlockchainTransDescription transaction={transaction as TransactionProps}/>

            {[Direction.Outgoing, Direction.Swap].includes(transaction.direction) && (
                <AccountingLines transaction={transaction}
                                 accountingLines={accountingLinesOutgoing}
                                 amount={transaction.amountOutgoing}
                                 symbolAmount={transaction?.detail?.symbolOutgoing as string}
                                 updateLine={updateLineOutgoing}
                                 token={transaction.tokenOutgoing as Token}
                                 tokenSymbol={transaction.detail?.symbolOutgoing as string}
                                 handleDeleteLine={handleDeleteLineOutgoing}
                                 handleAddNewLine={handleAddNewLineOutgoing}
                                 accountingTypeOptions={[AccountingTransactionType.Expense, AccountingTransactionType.Bill, AccountingTransactionType.Swap]}
                />
            )}

            {[Direction.Incoming, Direction.Swap].includes(transaction.direction) && (
                <AccountingLines transaction={transaction}
                                 accountingLines={accountingLinesIncoming}
                                 amount={transaction.amountIncoming}
                                 symbolAmount={transaction?.detail?.symbolIncoming as string}
                                 updateLine={updateLineIncoming}
                                 token={transaction.tokenIncoming as Token}
                                 tokenSymbol={transaction.detail?.symbolIncoming as string}
                                 handleDeleteLine={handleDeleteLineIncoming}
                                 handleAddNewLine={handleAddNewLineIncoming}
                                 accountingTypeOptions={[AccountingTransactionType.Income, AccountingTransactionType.Invoice, AccountingTransactionType.Swap]}
                />
            )}

            <BlockchainFee transaction={transaction}/>
            <EditTransactionModalFooter
                transaction={transaction}
                publishTransaction={publishTransaction}
                disabledPublish={disabledPublish}
            />
            {isTokenNonMapped && (
            <div className="absolute bottom-3 left-7 text-[#ECB90D] text-sm font-bold flex items-center gap-2">
              <YellowWarning/>
              {'Configure Mapping for token'}
              {reactNodeFormatterTransaction(transaction.tokenIncoming as Token, transaction.atomicTransactionId, 'modal')}
              {'to integrate this transaction'}
            </div>
            )}
          </div>
          )}
    </RightModal>
  );
};

export default EditTransactionModal;