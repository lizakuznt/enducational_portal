import { IUserDto } from "@/@types/IUserDto";
import { httpService } from "@/app/services/http.service";
import { queryOptions } from "@tanstack/react-query";

export const usersService = {
  baseQueryKey: "users",
  getUserList: async () => {
    try {
      const { data } = await httpService.get<IUserDto[]>("users/");
      return data;
    } catch (error) {
      throw error;
    }
  },
  getUserListQueryOptions: () => {
    return queryOptions({
      queryKey: [usersService.baseQueryKey, "list"],
      queryFn: usersService.getUserList,
    });
  },
  getUserById: async (id?: number) => {
    try {
      const { data } = await httpService.get<IUserDto>(`users/${id}/`);
      return data;
    } catch (error) {
      throw error;
    }
  },
  getUserByIdQueryOptions: (id?: number) => {
    return queryOptions({
      queryKey: [usersService.baseQueryKey, id],
      queryFn: () => usersService.getUserById(id),
      enabled: !!id,
      staleTime: 60 * 1000, // 1 min
    });
  },
  deleteUserById: async (id?: number) => {
    try {
      const { data } = await httpService.delete<IUserDto>(`users/${id}/`);
      return data;
    } catch (error) {
      throw error;
    }
  },
};
