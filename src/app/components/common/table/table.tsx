import { ComponentBox } from "@/app/components/common";
import { TableSkeleton } from "@/app/components/common/table/table-skeleton";
import { TColums } from "@/app/components/common/table/types";
import { cn } from "@/app/lib/lib";

interface TableProps<T extends object> {
  data: T[];
  columns: TColums<T>[];
  className?: string;
  isLoading?: boolean;
  [key: string]: any;
}

export const Table = <T extends object>({
  data,
  columns,
  isLoading = false,
  className,
  ...props
}: TableProps<T>) => {
  return (
    <ComponentBox className={className}>
      {isLoading && <TableSkeleton columns={columns} />}
      {!isLoading && (
        <table className="min-w-full divide-y divide-light-gray">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={column.id || `custom-${index}`} className="px-6 py-3">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-light-gray">
            {data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td
                    key={column.id || `custom-${colIndex}`}
                    className={cn(
                      "px-6 py-3 text-center",
                      column.cellBodyClassName
                    )}
                  >
                    {column.isCustom
                      ? column.component?.({ ...item, ...props })
                      : column.component
                      ? column.component({ ...item, ...props })
                      : String(column.id ? item[column.id] : "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </ComponentBox>
  );
};
