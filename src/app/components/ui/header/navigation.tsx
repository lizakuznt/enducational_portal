import { navigationData } from "@/app/data/navigation.data";
import { cn } from "@/app/lib/lib";
import type { FC } from "react";
import { NavLink } from "react-router";

export const Navigation: FC = () => {
  return (
    <nav className="flex gap-4">
      {navigationData.map((item) => (
        <NavLink
          key={item.URL}
          to={item.URL}
          className={({ isActive }) =>
            cn("text-lg text-center text-accent cursor-pointer", {
              "text-inherit pointer-events-none": isActive,
            })
          }
        >
          {item.pageName}
        </NavLink>
      ))}
    </nav>
  );
};
