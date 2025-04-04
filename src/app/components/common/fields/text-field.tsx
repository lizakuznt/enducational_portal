import { cn } from "@/app/lib/lib";
import { Eye, EyeOff } from "lucide-react";
import { type InputHTMLAttributes, useState, type FC, memo } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "password" | "text";
  error?: string;
}

export const TextField: FC<TextFieldProps> = memo(
  ({ type = "text", name, className, error, ...props }) => {
    const [viewValue, setViewValue] = useState(false);

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={name} className="relative">
          <input
            type={viewValue ? "text" : type}
            id={name}
            name={name}
            className={cn(
              "w-full text-xl p-3 border-1 border-accent rounded-md outline-1 outline-transparent focus:outline-accent transition-outline duration-200",
              {
                "border-red-500 outline-red-500 focus:outline-red-500": error,
              },
              className
            )}
            {...props}
          />

          {type === "password" && (
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setViewValue(!viewValue)}
            >
              {viewValue ? <Eye strokeWidth={1} /> : <EyeOff strokeWidth={1} />}
            </div>
          )}
        </label>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    );
  }
);
