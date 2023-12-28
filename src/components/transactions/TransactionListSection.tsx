import { useState, useMemo, SyntheticEvent } from "react";
import Link from "next/link";
import {
  AccountingTransactionAPIResult,
  TransactionProps,
} from "@/services/transactions";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import cn from "classnames";
import { Info, Refresh, Flow } from "../common/AppIcon";
import { Tooltip } from "react-tooltip";
import { YellowWarning } from "../common/AppIcon";
import { useBoolean } from "@/hooks/useBoolean";
import EditTransactionModal from "./EditTransactionModal";
import { getLocaleDateString } from "@/utils/time-utils";
import { abbreviateAddr } from "@/utils/utils";

interface PageProps {
  transactions: TransactionProps[] | undefined;
  onRefreshTransactions: () => Promise<any>;
  accountingTransactions: AccountingTransactionAPIResult | undefined;
  onRefreshAccountingTrasactions: () => Promise<any>;
}

function getMetadataString(
  metadata: { [key: string]: string } | undefined
): JSX.Element | JSX.Element[] {
  if (metadata) {
    const keys = Object.keys(metadata);
    return keys.map((key, idx) => (
      <p key={idx} className="text-white text-xs">
        <span className="capitalize">{key}</span>:
        <span className="uppercase underline">{metadata[key]}</span>
      </p>
    ));
  }

  return <></>;
}

const TransactionListSection = ({
  transactions = [],
  onRefreshTransactions,
  accountingTransactions,
  onRefreshAccountingTrasactions,
}: PageProps): JSX.Element => {
  const [selectedItems, setSelectedItems] = useState<(number | string)[]>([]);
  const editTransaction = useBoolean(false);
  const [selectedTransaction, setSelectedTransaction] = useState<
    TransactionProps | undefined
  >();
  const data = useMemo<TransactionProps[]>(
    () =>
      transactions.map((item, idx) => ({
        ...item,
        id: idx,
      })),
    [transactions]
  );

  const columns: ColumnDef<TransactionProps>[] = [
    {
      id: "identifier",
      cell: ({ row }): JSX.Element | string => (
        <input
          className="checkbox-round"
          type="checkbox"
          onChange={(e): void =>
            handleSelectItem(e, row.original.id)
          }
          checked={selectedItems.includes(
            row.original.atomicTransactionId || 0
          )}
        />
      ),
      header: (): JSX.Element | string => (
        <input
          className="checkbox-round"
          type="checkbox"
          onChange={(e): void => handleSelectAll(e)}
          checked={selectedItems.length === data.length && data.length > 0}
        />
      ),
    },
    {
      id: "date",
      cell: ({ row }): JSX.Element | string => {
        const date = new Date(row.original.createdAt);
        const dateStr = getLocaleDateString(date);
        return dateStr;
      },
      header: "Date&Time",
    },
    {
      id: "from_address",
      cell: ({ row }): JSX.Element | string => {
        if (row.original.from) {
          return (
            <>
              <span className="capitalize">wallet</span>
              {abbreviateAddr(row.original.from)}
            </>
          );
        }

        return "";
      },
      header: "From",
    },
    {
      id: "flow",
      cell: (): JSX.Element => {
        return <Flow />;
      },
      header: "",
    },
    {
      id: "to_address",
      cell: ({ row }): JSX.Element | string => {
        if (row.original.to) {
          return (
            <>
              <span className="capitalize inline-box relative">wallet</span>
              {abbreviateAddr(row.original.to)}
            </>
          );
        }

        return "";
      },
      header: "",
    },
    {
      id: "type",
      accessorKey: "type",
      cell: ({ row }): JSX.Element | string => (
        <span className="capitalize">{row.original.direction}</span>
      ),
      header: "",
    },
    {
      id: "from_detail",
      cell: ({ row }): JSX.Element | string => {
        if (row.original.direction === "Outgoing") {
          return (
            <>
              {row.original.detail && (
                <div className="flex flex-col items-center">
                  <span className="text-center uppercase inline-block relative">
                    {`${row.original.detail.amount.toFixed(2)} ${
                      row.original.detail.symbol
                    }`}
                    {row.original.detail.metadata && (
                      <>
                        <span
                          data-tooltip-id="info-fulltime"
                          className="absolute bottom-4 lg:top-0.5 -right-5 cursor-pointer"
                        >
                          <Info className="w-4 h-4" />
                        </span>
                        <Tooltip id="info-fulltime" place="top" variant="info">
                          {getMetadataString(row.original.detail.metadata)}
                        </Tooltip>
                      </>
                    )}
                  </span>
                  <span className="text-center uppercase">{`$${row.original.detail.price.toFixed(
                    2
                  )}`}</span>
                </div>
              )}
            </>
          );
        }
        return "";
      },
      header: "",
    },
    {
      id: "to_detail",
      cell: ({ row }): JSX.Element | string => {
        if (row.original.direction === "Incoming") {
          return (
            <>
              {row.original.detail && (
                <div className="flex flex-col items-center">
                  <span className="text-center uppercase inline-block relative">
                    {`${row.original.detail.amount.toFixed(2)} ${
                      row.original.detail.symbol
                    }`}
                    {row.original.detail.metadata && (
                      <>
                        <span
                          data-tooltip-id="info-fulltime"
                          className="absolute bottom-4 lg:top-0.5 -right-5 cursor-pointer"
                        >
                          <Info className="w-4 h-4" />
                        </span>
                        <Tooltip id="info-fulltime" place="top" variant="info">
                          {getMetadataString(row.original.detail.metadata)}
                        </Tooltip>
                      </>
                    )}
                  </span>
                  <span className="text-center uppercase">{`$${row.original.detail.price.toFixed(
                    2
                  )}`}</span>
                </div>
              )}
            </>
          );
        }

        return "";
      },
      header: "",
    },
    {
      id: "fee",
      accessorKey: "fee",
      cell: ({ row }): JSX.Element | string => {
        if (row.original.fee) {
          return (
            <>
              <p className="uppercase">{`${row.original.fee.amount}`}</p>
              <p className="uppercase">{`$${row.original.fee.price}`}</p>
            </>
          );
        }

        return "";
      },
      header: "FEE",
    },
    {
      id: "chain",
      accessorKey: "chain",
      header: (): JSX.Element | string => "Cahin",
    },
    {
      id: "published",
      accessorKey: "published",
      cell: ({ row }): JSX.Element | string => {
        if (row.original.status !== "NonPublished") {
          return (
            <div className="flex gap-1 items-center">
              <span className="text-[#4ADDB6] text-sm">Published</span>
              <div className="w-7 h-7 rounded-full bg-[#4ADDB6]" />
            </div>
          );
        } else {
          return (
            <div className="flex items-center gap-1">
              <div>
                <p className="text-sm">Yet</p>
                <p className="text-sm">to Publish</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#DEE1E6]" />
            </div>
          );
        }
      },
      header: "Status",
    },
    {
      id: "labels",
      accessorKey: "labels",
      cell: ({ row }): JSX.Element | string => (
        <>
          {row.original.labels.map((item, idx) => (
            <p key={idx}>{item}</p>
          ))}
        </>
      ),
      header: "Labels",
    },
    {
      id: "view",
      cell: ({ row }): JSX.Element | string => (
        <button
          className="bg-[#39BFF0] rounded-lg px-6 py-2 text-[#21254e] text-base hover:scale-95 w-20"
          onClick={(): void => {
            editTransaction.onTrue();
            setSelectedTransaction(row.original);
          }}
        >
          View
        </button>
      ),
      header: (): JSX.Element | string => (
        <div className="w-full pl-7">
          <button
            className="w-6 h-6 border-0 hover:boder-0 hover:rotate-45"
            onClick={(): void => {
              onRefreshData();
            }}
            disabled={loading}
          >
            <Refresh />
          </button>
        </div>
      ),
    },
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const onRefreshData = async (): Promise<void> => {
    setLoading(true);
    await onRefreshTransactions();
    await onRefreshAccountingTrasactions();
    setLoading(false);
  };

  const handleSelectItem = (
    e: SyntheticEvent<HTMLInputElement, Event>,
    id: string | number = 0
  ): void => {
    if (e.currentTarget.checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleSelectAll = (
    e: SyntheticEvent<HTMLInputElement, Event>
  ): void => {
    if (e.currentTarget.checked) {
      setSelectedItems(data.map((t) => t.atomicTransactionId || 0));
    } else {
      setSelectedItems([]);
    }
  };

  const table = useReactTable<TransactionProps>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => `${row.createdAt}-${row.id}`, //good to have guaranteed unique row ids/keys for rendering
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <>
      {selectedTransaction?.detail && (
        <EditTransactionModal
          editTransaction={editTransaction}
          transaction={selectedTransaction}
          accountingTransactions={accountingTransactions}
        />
      )}
      <div className="pt-5 pb-4">
        {table.getHeaderGroups().map((headerGroup) => (
          <div
            key={headerGroup.id}
            className="px-4 grid grid-cols-[36px,150px,108px,60px,120px,100px,125px,125px,70px,80px,125px,100px,143px] xl:grid-cols-[36px,150fr,110fr,60px,160fr,132fr,180fr,180fr,95fr,122fr,168fr,102fr,143px] border-0"
          >
            {headerGroup.headers.map((header) => (
              <div
                key={header.id}
                className={cn(
                  "text-[#21254E] text-base font-normal pr-2 flex justify-center items-center"
                )}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="space-y-6 mb-7">
        {transactions.length > 0 ? (
          table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className="relative px-4 py-8 bg-white hover:border-[#39bff0] transition-all rounded-xl shadow border grid grid-cols-[36px,150px,108px,60px,120px,100px,125px,125px,70px,80px,125px,100px,143px] xl:grid-cols-[36px,150fr,110fr,60px,198fr,132fr,180fr,180fr,95fr,122fr,168fr,102fr,143px]"
            >
              {row.getVisibleCells().map((cell) => (
                <div
                  key={cell.id}
                  className="flex flex-col justify-center items-center h-full px-1 text-base font-bold text-[#BDC1CA]"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
              {row.original.currencyMapping?.nonSetMapping && (
                <div className="absolute bottom-2 right-4 text-[#ECB90D] text-sm font-bold space-y-0.5">
                  <div className="flex justify-end">
                    <YellowWarning />
                  </div>
                  {`Configure Mapping for token ${row.original.currencyMapping.token} to integrate this transaction`}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center space-y-24 w-100% h-[calc(100vh-320px)]">
            <p className="text-[#171a1f] text-base font-bold">
              No transactions right now, please add a wallet in the source page
            </p>
            <Link
              className="bg-[#21254E] rounded-lg px-4 py-4 text-white text-xl font-bold hover:scale-95"
              href="/sources"
            >
              Go to Source
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default TransactionListSection;
