import { IUserDto } from "@/@types/IUserDto";
import { TColums } from "@/app/components/common/table/types";
import { ViewRoleName } from "@/app/components/ui/admin-ui";
import { Trash2 } from "lucide-react";

export const adminUsersConfig: TColums<
  IUserDto & {
    onDelete?: (id: IUserDto["id"]) => void;
  }
>[] = [
  {
    id: "username",
    header: "Имя пользователя",
    component: ({ username }) => <div>{username}</div>,
    cellBodyClassName: "max-w-[250px]",
  },
  {
    id: "email",
    header: "E-mail",
    component: ({ email }) => <div>{email}</div>,
    cellBodyClassName: "max-w-[450px]",
  },
  {
    id: "role",
    header: "Приоритет",
    component: ({ role }) => <ViewRoleName roleId={role} />,
    cellBodyClassName: "max-w-[250px]",
  },

  {
    header: "Действие",
    component: ({ id, onDelete }) => (
      <div className="flex gap-3 justify-center">
        <Trash2
          strokeWidth={1.25}
          className="text-red-500 cursor-pointer hover:text-red-700 transition-all duration-200"
          onClick={() => onDelete?.(id)}
        />
      </div>
    ),
    isCustom: true,
  },
];
