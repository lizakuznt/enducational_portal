import {
  TAuthLoginParams,
  TAuthRegisterParams,
  TAuthToken,
} from "@/@types/TAuth";
import { httpService, localStorageService } from "@/app/services";

export const authService = {
  baseQueryKey: "auth",
  register: async (params: TAuthRegisterParams) => {
    try {
      const { data } = await httpService.post<TAuthToken>("register", params);
      return data;
    } catch (error) {
      throw error;
    }
  },
  login: async (params: TAuthLoginParams) => {
    try {
      const { data } = await httpService.post<Omit<TAuthToken, "message">>(
        "token/",
        params
      );
      return data;
    } catch (error) {
      throw error;
    }
  },
  logout: () => {
    console.log("logout");
    localStorageService.removefromStorage("token");
  },
};
