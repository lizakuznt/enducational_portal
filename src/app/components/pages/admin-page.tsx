import type { FC } from "react";
import { AdminUserTable } from "@/app/components/ui/admin-ui";

export const AdminPage: FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-2xl font-bold">Администрирование</div>

      <AdminUserTable />
    </div>
  );
};
