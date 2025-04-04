import { Loader } from "@/app/components/common";
import { ROUTE } from "@/app/data/router/routes";
import { useUserStore } from "@/app/store";
import type { FC, ReactNode } from "react";
import { Navigate, RouteProps, useLocation } from "react-router";

interface ProtectedAuthRouteProps extends Omit<RouteProps, "element"> {
  element?: FC<any>;
  children?: ReactNode;
}

export const ProtectedAuthRoute: FC<ProtectedAuthRouteProps> = ({
  element: Component,
  children,
  ...rest
}) => {
  const location = useLocation();
  const isAuth = useUserStore((state) => state.isAuth);
  const isLoading = useUserStore((state) => state.isLoading);
  const isInitialized = useUserStore((state) => state.isInitialized);

  if (!isInitialized || isLoading)
    return (
      <div className="h-screen flex items-center">
        <Loader size="xxl" />
      </div>
    );

  if (!isAuth) {
    return (
      <Navigate
        to={{
          pathname: ROUTE.LOGIN,
        }}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return Component ? <Component {...rest} /> : children;
};
