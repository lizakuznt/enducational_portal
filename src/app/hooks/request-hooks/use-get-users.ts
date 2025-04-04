import { usersService } from "@/app/services";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  return useQuery(usersService.getUserListQueryOptions());
};
