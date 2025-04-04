import { cn } from "@/app/lib/lib";
import { memo, TextareaHTMLAttributes, type FC } from "react";

interface TextAreaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const TextAreaField: FC<TextAreaFieldProps> = memo(
  ({ name, className, error, ...props }) => {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={name}>
          <textarea
            id={name}
            name={name}
            maxLength={1000}
            className={cn(
              "w-full min-h-[125px] text-xl p-3 border-1 border-accent rounded-md overflow-auto resize-none outline-1 outline-transparent focus:outline-accent transition-outline duration-200",
              {
                "border-red-500 outline-red-500 focus:outline-red-500": error,
              },
              className
            )}
            {...props}
          />
        </label>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    );
  }
);
