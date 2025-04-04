import type { FC } from "react";
import { TColums } from "@/app/components/common/table/types";
import { cn } from "@/app/lib/lib";

export const TableSkeleton: FC<{ columns: TColums<any>[]; rows?: number }> = ({
  columns,
  rows = 5,
}) => {
  return (
    <table className="min-w-full divide-y divide-light-gray animate-pulse">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={column.id || `custom-${index}`} className="px-6 py-3">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-light-gray">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td
                key={column.id || `custom-${colIndex}`}
                className={cn(
                  "px-6 py-3 text-center",
                  column.cellBodyClassName
                )}
              >
                <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
