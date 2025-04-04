export type TRoleName = "admin" | "curator" | "student";
export interface IRoleDto {
  id: 2 | 3 | 4;
  name: TRoleName;
  description: string;
}
