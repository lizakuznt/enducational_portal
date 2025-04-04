import type { FC } from "react";
import { TRoleName } from "@/@types/IRoleDto";
import { ROUTE } from "@/app/data/router/routes";
import { useUserStore } from "@/app/store";
import { Navigate, RouteProps } from "react-router";

interface ProtectedRoleRouteProps extends Omit<RouteProps, "element"> {
  allowedRoles: TRoleName[];
  element: FC<any>;
}

export const ProtectedRoleRoute: FC<ProtectedRoleRouteProps> = ({
  element: Component,
  allowedRoles,
  ...rest
}) => {
  const activeRole = useUserStore((state) => state.activeRole);

  if (activeRole && allowedRoles.includes(activeRole)) {
    return <Component {...rest} />;
  }

  return (
    <Navigate
      to={{
        pathname: ROUTE.MAIN,
      }}
      replace
    />
  );
};
