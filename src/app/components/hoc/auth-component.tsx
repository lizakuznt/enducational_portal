import { useUserStore } from "@/app/store";
import { type FC, useEffect } from "react";

export const AuthComponent: FC = () => {
  const { checkAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return null;
};
