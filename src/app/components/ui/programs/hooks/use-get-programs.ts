import { programsService } from "@/app/services/programs-service";
import { useQuery } from "@tanstack/react-query";

export const useGetPrograms = () => {
  return useQuery(programsService.getProgramsQueryOptions());
};
