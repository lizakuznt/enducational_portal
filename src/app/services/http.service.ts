import { TUnauthorizedMessage } from "@/@types/TError";
import { appQueryClient } from "@/app/components/hoc";
import { APP_CONFIG } from "@/app/data/app.config";
import { ROUTE } from "@/app/data/router/routes";
import { localStorageService } from "@/app/services/localStorage-service";
import axios from "axios";

const http = axios.create({
  baseURL: APP_CONFIG.API_ENDPOINT,
});

http.interceptors.request.use(
  async (config) => {
    const authToken = localStorageService.fromStorage("token");

    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (!error.response) {
      console.error("Network error:", error);
      return Promise.reject(error);
    }

    const { response } = error;

    if (response.status === 401 && !response.config.url.includes(ROUTE.LOGIN)) {
      const errorUnauthorizedMessage: TUnauthorizedMessage | null =
        response?.data?.detail || null;

      localStorageService.removefromStorage("token");
      appQueryClient.removeQueries();

      if (errorUnauthorizedMessage) {
        if (
          errorUnauthorizedMessage ===
            "Authentication credentials were not provided." ||
          errorUnauthorizedMessage ===
            "Given token not valid for any token type"
        ) {
          window.location.href = `${ROUTE.LOGIN}`;
        }
      } else {
        window.location.href = `${ROUTE.LOGIN}`;
      }
    }

    if (response.status >= 500) {
      console.error("Server error:", error);
    }

    return Promise.reject(error);
  }
);

export const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  patch: http.patch,
  delete: http.delete,
};
