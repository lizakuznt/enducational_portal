import { AppWrapper, ProtectedRoleRoute } from "@/app/components/hoc";
import { ProtectedAuthRoute } from "@/app/components/hoc/protected-auth-route";
import { MainLayout } from "@/app/components/layouts/main-layout";
import {
  AdminPage,
  AuthPage,
  MainPage,
  ProgramIdPage,
  ProgramPage,
} from "@/app/components/pages";
import { LoginForm, RegisterForm } from "@/app/components/ui/auth";
import { ROUTE } from "@/app/data/router/routes";
import { createBrowserRouter, Navigate } from "react-router";

export const ROUTER = createBrowserRouter([
  {
    element: <AppWrapper />,
    children: [
      {
        element: <ProtectedAuthRoute element={MainLayout} />,
        children: [
          {
            index: true,
            path: ROUTE.MAIN,
            element: <MainPage />,
          },
          {
            path: ROUTE.PROGRAM,
            element: <ProgramPage />,
          },
          {
            path: ROUTE.PROGRAM_ID,
            element: <ProgramIdPage />,
          },
          {
            path: ROUTE.ADMIN,
            element: (
              <ProtectedRoleRoute
                allowedRoles={["admin"]}
                element={AdminPage}
              />
            ),
          },
        ],
      },
      {
        path: ROUTE.AUTH,
        element: <AuthPage />,
        children: [
          {
            path: ROUTE.LOGIN,
            element: <LoginForm />,
          },
          {
            path: ROUTE.REGISTER,
            element: <RegisterForm />,
          },
          {
            path: ROUTE.AUTH,
            element: <Navigate to={ROUTE.LOGIN} replace />,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to={ROUTE.MAIN} replace />,
      },
    ],
  },
]);
