import { IRoleDto } from "@/@types/IRoleDto";
import { httpService } from "@/app/services/http.service";
import { queryOptions } from "@tanstack/react-query";

export const roleService = {
  baseQueryKey: "role",
  getRoles: async () => {
    try {
      const { data } = await httpService.get<IRoleDto[]>("/roles/");
      return data;
    } catch (error) {
      throw error;
    }
  },
  getRolesQueryOptions: () => {
    return queryOptions({
      queryKey: [roleService.baseQueryKey, "list"],
      queryFn: roleService.getRoles,
      staleTime: 4 * 60 * 1000, // 4 min
    });
  },
};
