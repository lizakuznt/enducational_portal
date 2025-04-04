import { TAuthDecodedUser } from "@/@types/TAuth";
import { clsx } from "clsx";
import { jwtDecode } from "jwt-decode";
import { Toaster, toast } from "sonner";

export const cn = clsx;
export const decodedJwt = (token: string) => jwtDecode<TAuthDecodedUser>(token);
export const toaster = toast;
export const ToasterComponent = Toaster;
