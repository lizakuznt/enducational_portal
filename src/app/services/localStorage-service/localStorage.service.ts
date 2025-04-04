import { TLocalStorageService } from "@/@types/TLoacalStorage";

export const localStorageService: TLocalStorageService = {
  toStorage: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
  fromStorage: (key) => {
    const dataFromStorage = localStorage.getItem(key);
    return dataFromStorage ? JSON.parse(dataFromStorage) : null;
  },
  removefromStorage: (key) => {
    localStorage.removeItem(key);
  },
};
