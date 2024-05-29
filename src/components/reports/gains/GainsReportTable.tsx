import { useMemo } from "react";
import classNames from "classnames";
import { symbolFormatTransaction } from "@/lib/helpers";
import {
  type ColumnDef,
  type Header,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { CostingMethod, GainsReportAsset } from "@/services/reports/gains";

interface Props {
  assets: GainsReportAsset[];
  selectedMethod: CostingMethod;
}

export const GainsReportTable = ({ assets, selectedMethod }: Props): React.JSX.Element => {
  const columnHelper = createColumnHelper<GainsReportAsset>();

  const buildColumns = (): ColumnDef<GainsReportAsset, string>[] => [
    columnHelper.group({
      header: "Asset",
      columns: [
        {
          accessorKey: "token",
          header: "We want this not to render",
          cell: data => symbolFormatTransaction(data.row.original.token),
        },
      ],
    }),
    columnHelper.group({
      header: "Balance",
      columns: [
        {
          accessorKey: "tokenBalance",
          header: "We want this not to render either",
          cell: data => data.row.original.tokenBalance,
        },
      ],
    }),
    columnHelper.group({
      header: `Amounts (USD, ${selectedMethod.toUpperCase()} basis)`,
      columns: [
        {
          accessorKey: "totalCosts",
          cell: data => data.row.original.totalCosts[selectedMethod].toFixed(2),
          header: "Total cost",
          id: "totalCosts",
        },
        {
          accessorKey: "realizedGains",
          cell: data => data.row.original.realizedGains[selectedMethod].toFixed(2),
          header: "Realized gains",
          id: "realizedGains",
        },
        {
          accessorKey: "unrealizedGains",
          cell: data => data.row.original.unrealizedGains[selectedMethod].toFixed(2),
          header: "Unrealized gains",
          id: "unrealizedGains",
        },
      ],
    }),
  ];

  const columns = useMemo(buildColumns, [columnHelper, selectedMethod])

  const table = useReactTable<GainsReportAsset>({
    data: assets,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const calculateRowSpan = (header: Header<GainsReportAsset, unknown>): number => {
    if (header.depth === 0 && (header.index === 0 || header.index === 1)) {
      return 2;
    } else if ((header.index === 0 || header.index === 1)) {
      return 0;
    } else {
      return 1;
    }
  };

  return <table className="w-full border-collapse rounded-lg overflow-hidden">
    <thead className="bg-[#D7F0FB] border border-gray-300">
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header =>
            (header.id === "token" || header.id === "tokenBalance")
              ? null
              : <th
                  key={header.id}
                  className="border border-gray-300 p-2"
                  colSpan={header.colSpan}
                  rowSpan={calculateRowSpan(header)}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                  )}
                </th>
          )}
        </tr>
      ))}
    </thead>
    <tbody className="border border-gray-300">
      {table.getRowModel().rows.map((row, index) => (
        <tr
          key={row.id}
          className={index % 2 === 0 ? "" : "bg-sky-100"}
        >
          {row.getVisibleCells().map(cell => (
            <td
              key={cell.id}
              className={classNames(
                "border border-gray-300 p-2",
                cell.column.id === "token" ? "" : "text-right"
              )}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
};
