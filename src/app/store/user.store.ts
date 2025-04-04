import { create } from "zustand";
import { IUserDto } from "@/@types/IUserDto";
import { decodedJwt, toaster } from "@/app/lib/lib";
import { localStorageService, roleService } from "@/app/services";
import { usersService } from "@/app/services/users-service/users.service";
import { appQueryClient } from "@/app/components/hoc";
import { TRoleName } from "@/@types/IRoleDto";

interface IUserStoreState {
  isInitialized: boolean;
  isAuth: boolean;
  user: IUserDto | null;
  activeRole: TRoleName | null;
  isLoading: boolean;
  setAuth: (value: boolean) => void;
  setUser: (user: IUserDto | null) => void;
  checkAuth: () => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<IUserStoreState>((set) => ({
  isInitialized: false,
  isAuth: false,
  isLoading: true,
  user: null,
  activeRole: null,
  setAuth: (value: boolean) => set({ isAuth: value }),
  setUser: (value: IUserDto | null) => set({ user: value }),
  checkAuth: async () => {
    const token = localStorageService.fromStorage("token");

    if (!token) {
      set({ isLoading: false, isInitialized: true });
      return;
    }

    try {
      const decoded = decodedJwt(token);
      const user = await appQueryClient.fetchQuery(
        usersService.getUserByIdQueryOptions(decoded.user_id)
      );
      const roles = await appQueryClient.fetchQuery(
        roleService.getRolesQueryOptions()
      );
      const activeRole = roles.find((r) => r.id === decoded.role)?.name ?? null;

      if (!user || !activeRole) {
        localStorageService.removefromStorage("token");
        set({
          isInitialized: true,
          isAuth: false,
          user: null,
          isLoading: false,
          activeRole: null,
        });

        toaster.error("Произошла ошибка авторизации");
        return;
      }

      appQueryClient.setQueryData(
        usersService.getUserByIdQueryOptions(decoded.user_id).queryKey,
        user
      );
      appQueryClient.setQueryData(
        roleService.getRolesQueryOptions().queryKey,
        roles
      );

      set({
        isInitialized: true,
        isAuth: true,
        user,
        isLoading: false,
        activeRole,
      });
    } catch (error) {
      localStorageService.removefromStorage("token");
      set({
        isInitialized: true,
        isAuth: false,
        user: null,
        isLoading: false,
        activeRole: null,
      });

      console.error("Auth check failed:", error);
    }
  },
  logout: () => {
    localStorageService.removefromStorage("token");
    appQueryClient.removeQueries();
    set({ isAuth: false, user: null, activeRole: null });
  },
}));
