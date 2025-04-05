export interface Review {
  id?: string;
  userId?: string;
  trainingId?:string;
  grade:number;
  message:string;
  createdAt:Date
}
