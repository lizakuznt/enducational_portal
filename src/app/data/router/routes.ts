const MAIN_ROUTE = "/";

const AUTH_ROUTE = "/auth";
const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
const REGISTER_ROUTE = `${AUTH_ROUTE}/register`;

const PROGRAM_ROUTE = "/program";
const PROGRAM_ID_ROUTE = `${PROGRAM_ROUTE}/:program_id`;

const ADMIN_ROUTE = "/admin";

export const ROUTE = {
  MAIN: MAIN_ROUTE,
  AUTH: AUTH_ROUTE,
  LOGIN: LOGIN_ROUTE,
  REGISTER: REGISTER_ROUTE,
  PROGRAM: PROGRAM_ROUTE,
  PROGRAM_ID: PROGRAM_ID_ROUTE,
  ADMIN: ADMIN_ROUTE,
};
