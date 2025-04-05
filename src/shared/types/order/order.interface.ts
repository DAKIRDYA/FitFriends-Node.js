import { PayWay } from './payway.enum.js';

export interface Order {
  id?: string;
  type:string
  trainingId?:string;
  userId?:string;
  price:number;
  count:number;
  sum:number;
  payWay:PayWay;
  createdAt:Date
}
