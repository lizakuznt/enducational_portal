import { Program } from "@/app/components/ui/programs/program";
import type { FC } from "react";
import { useParams } from "react-router";

export const ProgramIdPage: FC = () => {
  const { program_id } = useParams<{ program_id: string }>();

  return <Program programId={program_id} />;
};
