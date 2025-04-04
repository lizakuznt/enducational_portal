import { toaster } from "@/app/lib/lib";
import { programsService } from "@/app/services/programs-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id?: number) => programsService.deleteProgramById(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        programsService.getProgramsQueryOptions()
      );
      toaster.success("Успешное удаление");
    },
    onError: () => {
      toaster.error("Произошла ошибка удаления");
    },
  });
};
