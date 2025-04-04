import { TAuthLoginParams } from "@/@types/TAuth";
import { toaster } from "@/app/lib/lib";
import { authService, localStorageService } from "@/app/services";
import { useUserStore } from "@/app/store";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const checkAuth = useUserStore((state) => state.checkAuth);

  const { data, mutateAsync, isPending } = useMutation({
    mutationFn: (params: TAuthLoginParams) => authService.login(params),
    onSuccess: async (data) => {
      const { access } = data;
      localStorageService.toStorage("token", access);
      await checkAuth();
      toaster.success("Успешная авторизация");
    },
    onError: () => {
      toaster.error("Произошла ошибка авторизации");
    },
  });

  return { data, mutateAsync, isPending };
};
