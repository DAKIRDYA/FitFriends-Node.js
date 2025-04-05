import { UserGender } from './user-gender.enum.js';
import { UserLocation } from './user-location.enum.js';
import { UserLevel } from './user-level.enum.js';
import { UserRole } from './user-role.enum.js';
import { UserTime } from './user-time.enum.js';
import { UserWorkout } from './user-workout.enum.js';

export interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
  gender: UserGender;
  birthday?: Date;
  description?: string;
  location: UserLocation
  background : string;
  createdAt?: Date;
  level : UserLevel;
  workout: UserWorkout[];
  time: UserTime;
  calories: number;
  caloriesPerDay : number;
  isReady: boolean;
  role?: UserRole;
}
