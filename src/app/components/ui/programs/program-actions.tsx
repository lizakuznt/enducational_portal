import type { FC } from "react";
import { ROUTE } from "@/app/data/router/routes";
import { useNavigate } from "react-router";
import { IProgramDto } from "@/@types/IProgramDto";
import { ExternalLink, FileSignature, Trash2 } from "lucide-react";
import { useUserStore } from "@/app/store";

interface IProgramActionsProps {
  id: IProgramDto["id"];
  onEdit?: (id: IProgramDto["id"]) => void;
  onDelete?: (id: IProgramDto["id"]) => void;
}

export const ProgramActions: FC<IProgramActionsProps> = ({
  id,
  onEdit,
  onDelete,
}) => {
  const { activeRole } = useUserStore();
  const navigate = useNavigate();

  return (
    <div className="flex gap-3 justify-center">
      <ExternalLink
        strokeWidth={1.25}
        className="text-dark-violet cursor-pointer hover:text-accent transition-all duration-200"
        onClick={() => navigate(`${ROUTE.PROGRAM}/${id}`)}
      />

      {activeRole && ["curator", "admin"].includes(activeRole) && (
        <>
          <FileSignature
            strokeWidth={1.25}
            className="text-dark-violet cursor-pointer hover:text-accent transition-all duration-200"
            onClick={() => onEdit?.(id)}
          />

          <Trash2
            strokeWidth={1.25}
            className="text-red-500 cursor-pointer hover:text-red-700 transition-all duration-200"
            onClick={() => onDelete?.(id)}
          />
        </>
      )}
    </div>
  );
};
