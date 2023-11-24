import { useState, useMemo, SyntheticEvent } from "react";
import { TransactionProps } from "@/services/transactions";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import cn from "classnames";
import { Info, Refresh, Flow } from "../common/AppIcon";
import { Tooltip } from "react-tooltip";

interface PageProps {
  transactions: TransactionProps[] | undefined;
  onRefresh: () => Promise<any>;
}

function getLocaleDateString(date: Date): string {
  // Define options for day, month, year, hour, minute, second
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  // Create an Intl.DateTimeFormat instance for date and time
  const dateFormatter = new Intl.DateTimeFormat("en-US", dateOptions);
  const timeFormatter = new Intl.DateTimeFormat("en-US", timeOptions);

  // Format the date and time parts separately
  const datePart = dateFormatter.format(date);
  const timePart = timeFormatter.format(date);

  // Combine and return the formatted string
  return `${datePart}\n${timePart}`;
}

function abbreviateAddr(addr: string): string {
  if (addr.length <= 8) return addr;

  return addr.slice(0, 3) + "..." + addr.slice(-4);
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
    // return str;
  }

  return <></>;
}

const TransactionListSection = ({
  transactions = [],
  onRefresh,
}: PageProps): JSX.Element => {
  const [selectedItems, setSelectedItems] = useState<(number | string)[]>([]);
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
          onChange={(e): void => handleSelectItem(e, row.original.id)}
          checked={selectedItems.includes(row.original.id || 0)}
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
        if (row.original.from.address) {
          return (
            <>
              <span className="capitalize">{row.original.from.type}</span>
              {abbreviateAddr(row.original.from.address)}
            </>
          );
        }

        return "";
      },
      header: "From",
    },
    {
      id: "flow",
      cell: ({ row }): JSX.Element | string => {
        if (row.original.from.address) {
          return <Flow />;
        }

        return "";
      },
      header: "",
    },
    {
      id: "to_address",
      cell: ({ row }): JSX.Element | string => {
        if (row.original.to.address) {
          return (
            <>
              <span className="capitalize inline-box relative">
                {row.original.to.type}
              </span>
              {abbreviateAddr(row.original.to.address)}
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
        <span className="capitalize">{row.original.type}</span>
      ),
      header: "",
    },
    {
      id: "from_detail",
      cell: ({ row }): JSX.Element | string => {
        if (row.original.from.detail) {
          return (
            <div className="flex flex-col items-center">
              <span className="text-center uppercase inline-block relative">
                {`${row.original.from.detail.amount.toFixed(2)} ${
                  row.original.from.detail.symbol
                }`}
                {row.original.from.detail.metadata && (
                  <>
                    <span
                      data-tooltip-id="info-fulltime"
                      className="absolute bottom-4 lg:top-0 -right-3 cursor-pointer"
                    >
                      <Info className="w-4 h-4" />
                    </span>
                    <Tooltip id="info-fulltime" place="top" variant="info">
                      {getMetadataString(row.original.from.detail.metadata)}
                    </Tooltip>
                  </>
                )}
              </span>
              <span className="text-center uppercase">{`$${row.original.from.detail.price.toFixed(
                2
              )}`}</span>
            </div>
          );
        }
        return "";
      },
      header: "",
    },
    {
      id: "to_detail",
      cell: ({ row }): JSX.Element | string => {
        if (row.original.to.detail) {
          return (
            <div className="flex flex-col items-center">
              <span className="text-center uppercase inline-block relative">
                {`${row.original.to.detail.amount.toFixed(2)} ${
                  row.original.to.detail.symbol
                }`}
                {row.original.to.detail.metadata && (
                  <>
                    <span
                      data-tooltip-id="info-fulltime"
                      className="absolute bottom-4 lg:top-0.5 -right-5 cursor-pointer"
                    >
                      <Info className="w-4 h-4" />
                    </span>
                    <Tooltip id="info-fulltime" place="top" variant="info">
                      {getMetadataString(row.original.to.detail.metadata)}
                    </Tooltip>
                  </>
                )}
              </span>
              <span className="text-center uppercase">{`$${row.original.to.detail.price.toFixed(
                2
              )}`}</span>
            </div>
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
              <p className="uppercase">{`${row.original.fee.amount.toFixed(
                2
              )}`}</p>
              <p className="uppercase">{`$${row.original.fee.price.toFixed(
                2
              )}`}</p>
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
        if (row.original.published) {
          return (
            <div className="flex gap-1 items-center gap-1">
              <span className="text-[#4ADDB6] text-sm">Published</span>
              <div className="w-7 h-7 rounded-full bg-[#4ADDB6]" />
            </div>
          );
        } else {
          return (
            <div className="flex gap-1 items-center gap-1">
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
      cell: (): JSX.Element | string => (
        <button className="bg-[#39BFF0] rounded-lg px-6 py-2 text-[#21254e] text-base hover:scale-95 w-20">
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
    await onRefresh();
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
      setSelectedItems(data.map((t) => t.id || 0));
    } else {
      setSelectedItems([]);
    }
  };

  const table = useReactTable<TransactionProps>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.createdAt, //good to have guaranteed unique row ids/keys for rendering
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <>
      <div className="pt-5 pb-4">
        {table.getHeaderGroups().map((headerGroup) => (
          <div
            key={headerGroup.id}
            className="px-4 grid grid-cols-[36px,150px,108px,60px,120px,100px,125px,125px,70px,80px,125px,100px,143px] xl:grid-cols-[36px,150fr,110fr,60px,160fr,132fr,180fr,180fr,95fr,122fr,168fr,102fr,143px] border-0"
          >
            {headerGroup.headers.map((header) => (
              <div
                key={header.id}
                // colSpan={header.colSpan}
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
      <div className="space-y-6 mb-2">
        {table.getRowModel().rows.map((row) => (
          <div
            key={row.id}
            className="px-4 py-8 bg-white hover:border-[#39bff0] transition-all rounded-xl shadow border grid grid-cols-[36px,150px,108px,60px,120px,100px,125px,125px,70px,80px,125px,100px,143px] xl:grid-cols-[36px,150fr,110fr,60px,198fr,132fr,180fr,180fr,95fr,122fr,168fr,102fr,143px]"
          >
            {row.getVisibleCells().map((cell) => (
              <div
                key={cell.id}
                className="flex flex-col justify-center h-full px-1 text-base font-bold text-[#BDC1CA]"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default TransactionListSection;
