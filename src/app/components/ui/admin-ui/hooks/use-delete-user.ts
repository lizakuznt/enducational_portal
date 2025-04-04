import { toaster } from "@/app/lib/lib";
import { usersService } from "@/app/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id?: number) => usersService.deleteUserById(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        usersService.getUserListQueryOptions()
      );
      toaster.success("Успешное удаление");
    },
    onError: () => {
      toaster.error("Произошла ошибка удаления");
    },
  });
};
