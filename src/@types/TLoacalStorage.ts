export type TLocalStorageKeyAuthToken = "token";

export type TLocalStorageKeys = TLocalStorageKeyAuthToken | string;

export type TDataByStorageKey<K> = K extends TLocalStorageKeyAuthToken
  ? string
  : unknown;

export type TLocalStorageService = {
  toStorage: <T extends TLocalStorageKeys>(
    key: T,
    data: TDataByStorageKey<T>
  ) => void;
  fromStorage: <T extends TLocalStorageKeys>(
    key: T
  ) => TDataByStorageKey<T> | null;
  removefromStorage: (key: TLocalStorageKeys) => void;
};
