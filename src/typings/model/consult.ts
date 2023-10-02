
import { Types } from 'mongoose';

export interface IConsult {
  user?: Types.ObjectId | string;
  date?: Date;
  time?: string;
  patientName?: string;
  age?: string;
  consultationCategoryId?: string;
  consultationCategoryName?: string;
  gender?: string;
  symptoms?: string;
  status?: string;


}
