import { type FC } from "react";
import { ComponentBox } from "@/app/components/common";
import { useGetProgram } from "@/app/components/ui/programs/hooks";
import { ProgramSkeleton } from "@/app/components/ui/programs/program/program-skeleton";
import { CandlestickChart, Gauge } from "lucide-react";

export const Program: FC<{ programId?: string }> = ({ programId }) => {
  const { data: program, isPending } = useGetProgram(programId);

  if (isPending) return <ProgramSkeleton />;
  if (!program)
    return <div className="text-center text-3xl">Программа не найдена</div>;

  return (
    <div className="flex flex-col gap-5">
      <div className="text-2xl text-center font-bold">{program.name}</div>

      <div className="flex gap-5">
        <div className="flex-1 flex-col max-w-[800px]">
          <div className="text-2xl mb-2 text-center">Описание</div>

          <ComponentBox className="min-h-[200px] text-xl text-center">
            {program.description}
          </ComponentBox>
        </div>

        <div className="flex flex-col gap-5 pt-7">
          <div className="text-xl text-center py-2 px-5 bg-light-violet border-1 border-light-gray rounded-2xl relative">
            <span>{program.level}</span>
            <Gauge className="absolute top-[-10px] right-[-5px] text-dark-violet" />
          </div>
          <div className="text-xl text-center py-2 px-5 bg-light-violet border-1 border-light-gray rounded-2xl relative">
            <span>{program.status}</span>
            <CandlestickChart
              strokeWidth={1.5}
              className="absolute top-[-10px] right-[-5px] text-dark-violet"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
