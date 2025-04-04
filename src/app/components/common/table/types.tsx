import type { JSX } from "react";

export type TColums<T> = {
  id?: Extract<keyof T, string>;
  header?: string;
  component?: (data: T) => JSX.Element;
  cellBodyClassName?: string;
  isCustom?: boolean;
};
