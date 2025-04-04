import { Loader } from "@/app/components/common";
import { cn } from "@/app/lib/lib";
import type { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  size = "md",
  isLoading,
  ...props
}) => {
  return (
    <button
      className={cn(
        "p-3 text-white bg-accent border border-accent rounded-md cursor-pointer transition-all duration-200 outline-1 outline-transparent hover:bg-dark-violet hover:border-dark-violet active:text-accent active:bg-light-violet active:border-light-violet disabled:cursor-default disabled:bg-light-gray disabled:border-light-gray",
        {
          "text-sm": size === "sm",
          "text-[16px]": size === "md",
          "text-xl": size === "lg",
        },
        className
      )}
      {...props}
    >
      {isLoading ? <Loader size={size} /> : children}
    </button>
  );
};
