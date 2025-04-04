import type { FC } from "react";
import { ComponentContainer } from "@/app/components/common";
import { Logout } from "@/app/components/ui/auth";
import { Navigation } from "@/app/components/ui/header";
import { ROUTE } from "@/app/data/router/routes";
import { useUserStore } from "@/app/store";
import { BrainCircuit, FolderLock } from "lucide-react";
import { Link, NavLink } from "react-router";

export const Header: FC = () => {
  const user = useUserStore((state) => state.user);
  const activeRole = useUserStore((state) => state.activeRole);

  return (
    <header className="py-8">
      <ComponentContainer className="flex gap-2 items-center place-content-between">
        <NavLink to={ROUTE.MAIN} className="flex items-center gap-2">
          <BrainCircuit size={32} strokeWidth={1.25} />
        </NavLink>

        <Navigation />

        <div className="flex items-center gap-3 w-full max-w-[275px]">
          <div className="text-xl text-center truncate flex-1 min-w-0">
            <div className="flex gap-1 items-center">
              {activeRole && ["admin"].includes(activeRole) && (
                <Link to={ROUTE.ADMIN}>
                  <FolderLock
                    size={26}
                    className="text-dark-violet cursor-pointer hover:text-accent transition-all duration-200"
                  />
                </Link>
              )}

              <div>{user?.username}</div>
            </div>
          </div>

          <Logout />
        </div>
      </ComponentContainer>
    </header>
  );
};
