import { useMemo } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { UseBooleanReturnProps } from "@/hooks/useBoolean";
import { APIKey } from "@/services/apiKeys";
import { getLocaleDateString } from "@/utils/time-utils";
import { abbreviateAddr } from "@/utils/utils";

interface Props {
  className: string;
  apiKeys: APIKey[];
  shouldCreateAPIKey: UseBooleanReturnProps;
}

export const APIKeysList = ({ apiKeys }: Props): React.JSX.Element => {
  const addIdToKeys = (): APIKey[] => apiKeys.map(
    (key, index) => ({ ...key, id: index, })
  );

  const data = useMemo<APIKey[]>(addIdToKeys, [apiKeys]);

  const columns: ColumnDef<APIKey>[] = [
    {
      id: "apiKey",
      cell: ({ row: { original: { apiKey }}}): string => abbreviateAddr(apiKey),
      header: "API key"
    },
    {
      id: "expiry_date",
      cell: (): string => {
        const date = new Date();
        return getLocaleDateString(date);
      },
      header: "Expires at"
    },
    {
      id: "delete_key",
      cell: (): React.JSX.Element => {
        return <p>I am a delete key button!</p>
      },
      header: "Delete key"
    },
  ];

  const table = useReactTable<APIKey>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (apiKey) => apiKey.apiKey,
  })

  return (
    <>
      <div className="pt-5 pb-4">
        {table.getHeaderGroups().map(headerGroup => (
          <div
            key={headerGroup.id}
            className="grid grid-cols-3 gap-4 border-red"
          >
            {headerGroup.headers.map(header => (
              <div
                key={header.id}
                className="text-[#21254E] text-base font-normal pr-2 flex justify-center items-center"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                }
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="space-y-6 mb-7">
        {table.getRowModel().rows.map(row => (
          <div
            key={row.id}
            className="relative px-4 py-8 bg-white hover:border-[#39bff0] transition-all rounded-xl shadow border grid grid-cols-3"
          >
            {row.getVisibleCells().map(cell => (
              <div
                key={cell.id}
                className="flex flex-col justify-center items-center h-full px-1 text-base font-bold text-[#BDC1CA]"
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
