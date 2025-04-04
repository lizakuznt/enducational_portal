import type { FC } from "react";
import { Table } from "@/app/components/common";
import { adminUsersConfig } from "@/app/components/ui/admin-ui/admin-user-table/config";
import { useGetUsers } from "@/app/hooks/request-hooks";
import { useDeleteUser } from "@/app/components/ui/admin-ui/hooks";

export const AdminUserTable: FC = () => {
  const { data = [], isPending } = useGetUsers();
  const deleteUser = useDeleteUser();

  return (
    <div>
      <div className="max-w-[1200px] w-full mx-auto">
        <div className="flex gap-4 items-center justify-center mb-4">
          <div className="text-2xl">Пользователи</div>
        </div>

        <Table
          data={data}
          isLoading={isPending}
          columns={adminUsersConfig}
          onDelete={(id?: number) => deleteUser.mutate(id)}
        />
      </div>
    </div>
  );
};
