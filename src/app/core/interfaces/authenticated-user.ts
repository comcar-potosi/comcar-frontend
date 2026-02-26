import { ROLES_CODE_SYSTEM } from "@core/enums/roles.enum";

export interface AuthenticatedUser {
  iat: number;
  exp: number;
  sub: string;
  role: ROLES_CODE_SYSTEM;
  userId: number;
}