import { appQueryClient } from "@/app/components/hoc/query-client-provider";
import { QueryClientProvider as QueryProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";

export const QueryClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider client={appQueryClient}>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />

      {children}
    </QueryProvider>
  );
};
