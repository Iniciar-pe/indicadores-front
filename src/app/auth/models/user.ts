import { Role } from './role';

export class User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: Role;
  token?: string;
  number?: string;
  address?: string;
  country?: string;
  city?: string;
  code?: string;
}
