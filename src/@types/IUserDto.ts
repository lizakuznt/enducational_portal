import { IRoleDto } from "@/@types/IRoleDto";

export interface IUserDto {
  id: number;
  last_login: string | null;
  username: string;
  password: string;
  email: string;
  is_active: boolean;
  role: IRoleDto["id"];
}
