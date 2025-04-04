import { toaster } from "@/app/lib/lib";
import {
  TUpdateProgramParams,
  programsService,
} from "@/app/services/programs-service";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useUpdateProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TUpdateProgramParams) =>
      programsService.updateProgramById(data),
    onSuccess: async (_, { id }) => {
      await queryClient.invalidateQueries(
        programsService.getProgramsQueryOptions()
      );
      queryClient.removeQueries(programsService.getProgramByIdQueryOptions(id));
      toaster.success("Успешное обновление");
    },
    onError: () => {
      toaster.error("Произошла ошибка обновления");
    },
  });
};
