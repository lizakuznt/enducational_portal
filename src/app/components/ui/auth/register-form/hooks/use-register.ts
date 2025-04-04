import { TAuthRegisterParams } from "@/@types/TAuth";
import { authService, localStorageService } from "@/app/services";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/app/store";
import { toaster } from "@/app/lib/lib";

export const useRegister = () => {
  const checkAuth = useUserStore((state) => state.checkAuth);

  const { data, mutateAsync, isPending } = useMutation({
    mutationFn: (params: TAuthRegisterParams) => authService.register(params),
    onSuccess: async (data) => {
      const { access } = data;
      localStorageService.toStorage("token", access);
      await checkAuth();
      toaster.success("Успешная регистрация пользователя");
    },
    onError: () => {
      toaster.error("Произошла ошибка регистрации");
    },
  });

  return { data, mutateAsync, isPending };
};
