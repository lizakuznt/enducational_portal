import { IProgramDto } from "@/@types/IProgramDto";
import { httpService } from "@/app/services/http.service";
import { queryOptions } from "@tanstack/react-query";

export type TCreateProgramParams = Partial<
  Omit<IProgramDto, "id" | "created_at" | "updated_at">
>;
export type TUpdateProgramParams = Partial<
  Omit<IProgramDto, "created_at" | "updated_at">
>;

export const programsService = {
  baseQueryKey: "programs",
  getPrograms: async () => {
    try {
      const { data } = await httpService.get<IProgramDto[]>("programs/");
      return data;
    } catch (error) {
      throw error;
    }
  },
  getProgramsQueryOptions: () => {
    return queryOptions({
      queryKey: [programsService.baseQueryKey, "list"],
      queryFn: programsService.getPrograms,
    });
  },
  getProgramById: async (id?: string | number) => {
    try {
      const { data } = await httpService.get<IProgramDto>(`programs/${id}/`);
      return data;
    } catch (error) {
      throw error;
    }
  },
  getProgramByIdQueryOptions: (id?: string | number) => {
    return queryOptions({
      queryKey: [programsService.baseQueryKey, id],
      queryFn: () => programsService.getProgramById(id),
      enabled: !!id,
    });
  },
  createProgram: async (
    programData: TCreateProgramParams,
    { signal }: { signal?: AbortSignal } = {}
  ) => {
    try {
      const { data } = await httpService.post<IProgramDto>(
        `programs/`,
        programData,
        { signal }
      );
      return data;
    } catch (error) {
      throw error;
    }
  },
  updateProgramById: async (programData: TUpdateProgramParams) => {
    try {
      const { data } = await httpService.patch<IProgramDto>(
        `programs/${programData?.id}/`,
        programData
      );
      return data;
    } catch (error) {
      throw error;
    }
  },
  deleteProgramById: async (id?: number) => {
    try {
      await httpService.delete<null>(`programs/${id}/`);
    } catch (error) {
      throw error;
    }
  },
};
