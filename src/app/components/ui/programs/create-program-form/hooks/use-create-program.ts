import { toaster } from "@/app/lib/lib";
import {
  programsService,
  TCreateProgramParams,
} from "@/app/services/programs-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TCreateProgramParams) =>
      programsService.createProgram(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        programsService.getProgramsQueryOptions()
      );
      toaster.success("Успешное создание");
    },
    onError: () => {
      toaster.error("Произошла ошибка создания");
    },
  });
};
