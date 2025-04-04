import { roleService } from "@/app/services";
import { useQuery } from "@tanstack/react-query";

export const useGetRoles = () => {
  return useQuery(roleService.getRolesQueryOptions());
};
