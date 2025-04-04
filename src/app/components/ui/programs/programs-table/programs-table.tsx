import { useRef, type FC } from "react";
import { Button, Table } from "@/app/components/common";
import { programsConfig } from "@/app/components/ui/programs/programs-table/config";
import {
  CreateProgramForm,
  EditProgramForm,
  TCreateProgramFormRef,
  TEditProgramFormRef,
} from "@/app/components/ui/programs";
import {
  useDeleteProgram,
  useGetPrograms,
} from "@/app/components/ui/programs/hooks";
import { useUserStore } from "@/app/store";

export const ProgramsTable: FC = () => {
  const { activeRole } = useUserStore();

  const { data = [], isPending } = useGetPrograms();
  const deleteProgram = useDeleteProgram();

  const editProgramFormRef = useRef<TEditProgramFormRef>(null);
  const createProgramFormRef = useRef<TCreateProgramFormRef>(null);

  return (
    <div className="max-w-[1200px] w-full mx-auto">
      <div className="flex gap-4 items-center justify-center mb-4">
        <div className="text-2xl font-bold text-center">Программы</div>

        {activeRole && ["curator", "admin"].includes(activeRole) && (
          <Button onClick={() => createProgramFormRef.current?.onOpen()}>
            Создать программу
          </Button>
        )}
      </div>

      <Table
        data={data}
        columns={programsConfig}
        isLoading={isPending}
        onEdit={(id?: number) => editProgramFormRef.current?.onOpen(id)}
        onDelete={(id?: number) => deleteProgram.mutate(id)}
      />

      <CreateProgramForm ref={createProgramFormRef} />
      <EditProgramForm ref={editProgramFormRef} />
    </div>
  );
};
