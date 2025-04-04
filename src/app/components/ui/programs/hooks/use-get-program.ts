import { programsService } from "@/app/services/programs-service";
import { useQuery } from "@tanstack/react-query";

export const useGetProgram = (id?: string | number) => {
  return useQuery(programsService.getProgramByIdQueryOptions(id));
};
