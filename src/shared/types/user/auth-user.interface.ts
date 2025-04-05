import { User } from './user.interface.js';

export interface AuthUser extends User {
  passwordHash: string
}
