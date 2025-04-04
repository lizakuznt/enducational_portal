import { AuthComponent } from "@/app/components/hoc/auth-component";
import { QueryClientProvider } from "@/app/components/hoc/query-client-provider";
import { ToasterComponent } from "@/app/lib/lib";
import { Outlet } from "react-router";

export const AppWrapper = () => {
  return (
    <>
      <QueryClientProvider>
        <AuthComponent />
        <Outlet />
      </QueryClientProvider>
      <ToasterComponent richColors position="top-left" />
    </>
  );
};
