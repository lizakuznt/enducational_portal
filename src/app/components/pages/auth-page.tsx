import { useEffect, type FC } from "react";
import { ComponentBox, ComponentContainer } from "@/app/components/common";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { ROUTE } from "@/app/data/router/routes";
import { useUserStore } from "@/app/store";

export const AuthPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth } = useUserStore();

  useEffect(() => {
    if (isAuth) {
      const redirectPath = location.state?.from || ROUTE.MAIN;
      navigate(redirectPath, { replace: true });
    }
  }, [isAuth, navigate, location.state]);

  const locationAuth = location.pathname;

  if (isAuth) return null;

  return (
    <ComponentContainer className="h-screen flex items-center">
      <div className="max-w-[400px] w-full mx-auto">
        <ComponentBox className="flex flex-col gap-5">
          <div className="text-center text-2xl font-medium">
            {
              { [ROUTE.LOGIN]: "Вход", [ROUTE.REGISTER]: "Регистрация" }[
                locationAuth
              ]
            }
          </div>

          <Outlet />

          {
            {
              [ROUTE.LOGIN]: (
                <Link
                  to={ROUTE.REGISTER}
                  className="text-lg text-center text-accent cursor-pointer"
                >
                  Зарегистрироваться
                </Link>
              ),
              [ROUTE.REGISTER]: (
                <Link
                  to={ROUTE.LOGIN}
                  className="text-lg text-center text-accent cursor-pointer"
                >
                  Войти
                </Link>
              ),
            }[locationAuth]
          }
        </ComponentBox>
      </div>
    </ComponentContainer>
  );
};
