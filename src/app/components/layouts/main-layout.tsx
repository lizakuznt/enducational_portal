import { ComponentContainer } from "@/app/components/common";
import { Header } from "@/app/components/ui/header";
import type { FC } from "react";
import { Outlet } from "react-router";

export const MainLayout: FC = () => {
  return (
    <>
      <Header />

      <ComponentContainer>
        <Outlet />
      </ComponentContainer>
    </>
  );
};
