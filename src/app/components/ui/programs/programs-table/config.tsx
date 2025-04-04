import { IProgramDto } from "@/@types/IProgramDto";
import { TColums } from "@/app/components/common/table/types";
import { ProgramActions } from "@/app/components/ui/programs/program-actions";

export const programsConfig: TColums<
  IProgramDto & {
    onEdit?: (id: IProgramDto["id"]) => void;
    onDelete?: (id: IProgramDto["id"]) => void;
  }
>[] = [
  {
    id: "name",
    header: "Название",
    component: ({ name }) => <div>{name}</div>,
    cellBodyClassName: "max-w-[250px]",
  },
  {
    id: "description",
    header: "Описание",
    component: ({ description }) => <div>{description}</div>,
    cellBodyClassName: "max-w-[450px]",
  },
  {
    id: "level",
    header: "Уровень",
    component: ({ level }) => <div>{level}</div>,
    cellBodyClassName: "max-w-[250px]",
  },
  {
    id: "status",
    header: "Статус",
    component: ({ status }) => <div>{status}</div>,
    cellBodyClassName: "max-w-[250px]",
  },
  {
    header: "Действия",
    component: ({ id, onEdit, onDelete }) => (
      <ProgramActions {...{ id, onEdit, onDelete }} />
    ),
    isCustom: true,
  },
];
