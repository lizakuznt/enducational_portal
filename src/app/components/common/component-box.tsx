import type { FC, PropsWithChildren } from "react";
import { cn } from "@/app/lib/lib";

export const ComponentBox: FC<
  PropsWithChildren<unknown> & { className?: string }
> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "p-5 border-1 rounded-xl border-light-gray shadow-2xl",
        className
      )}
    >
      {children}
    </div>
  );
};
