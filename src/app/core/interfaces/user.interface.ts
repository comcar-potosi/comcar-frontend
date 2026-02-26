import { ROLES_VALUE_SYSTEM } from '@core/enums/roles.enum';
import { DataBase } from './base-common.interface';

export interface User extends DataBase {
  id: number,
  name: string,
  surname: string,
  username: string,
  email: string,
  password: string,
  role: ROLES_VALUE_SYSTEM,
  state: boolean
}

export interface ResetPassword {
  newPassword: string,
  confirmationPassword: string,
}
