import { UserGender } from '../user/user-gender.enum.js';
import { UserLevel } from '../user/user-level.enum.js';
import { UserTime } from '../user/user-time.enum.js';
import { UserWorkout } from '../user/user-workout.enum.js';

export interface Training {
  id?: string;
  name: string;
  background : string;
  level : UserLevel;
  workout: UserWorkout[];
  time: UserTime;
  price: number;
  calories: number;
  description?: string;
  gender: UserGender;
  video: string;
  rating: number;
  trainer: string;
  special:boolean

}
