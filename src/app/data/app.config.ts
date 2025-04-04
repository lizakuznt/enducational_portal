let API_ENDPOINT;

if (import.meta.env.MODE === "development") {
  API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
}

if (process.env.NODE_ENV === "production") {
  API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
}

export const APP_CONFIG = {
  API_ENDPOINT: API_ENDPOINT || "",
};
