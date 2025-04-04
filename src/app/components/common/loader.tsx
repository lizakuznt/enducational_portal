import { cn } from "@/app/lib/lib";
import { Loader2 } from "lucide-react";
import { type FC } from "react";

interface LoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xxl";
}

export const Loader: FC<LoaderProps> = ({ size = "md", className }) => (
  <div
    className={cn(
      {
        "w-[20px] h-[20px]": size === "sm",
        "w-[24px] h-[24px]": size === "md",
        "w-[28px] h-[28px]": size === "lg",
        "w-[52px] h-[52px]": size === "xxl",
      },
      "mx-auto",
      className
    )}
  >
    <Loader2 className="w-full h-full animate-spin text-accent" />
  </div>
);
