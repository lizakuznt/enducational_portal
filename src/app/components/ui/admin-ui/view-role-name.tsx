import type { FC } from "react";
import { IRoleDto } from "@/@types/IRoleDto";
import { useGetRoles } from "@/app/hooks";

export const ViewRoleName: FC<{ roleId: IRoleDto["id"] }> = ({ roleId }) => {
  const { data = [] } = useGetRoles();
  return <>{data.find((r) => r.id === roleId)?.name}</>;
};
