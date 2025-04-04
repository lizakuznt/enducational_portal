import { IUserDto } from "@/@types/IUserDto";
import { type JwtPayload } from "jwt-decode";

export type TAuthRegisterParams = {
  username: string;
  password: string;
  password2: string;
  email: string;
  role: number;
};

export type TAuthLoginParams = {
  username: string;
  password: string;
};

export type TAuthToken = {
  message: string;
  access: string;
  refresh: string;
};

export type TAuthDecodedUser = Pick<IUserDto, "role" | "username"> & {
  user_id: number;
} & JwtPayload;
