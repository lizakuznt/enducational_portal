import { cn } from "@/app/lib/lib";
import type { FC, PropsWithChildren } from "react";

interface ComponentContainerProps extends PropsWithChildren<unknown> {
  className?: string;
}

export const ComponentContainer: FC<ComponentContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("container mx-auto px-3.5", className)}>{children}</div>
  );
};
