import { Types } from 'mongoose';

export interface ICategory {
  categoryName?: string;
  parent?: Types.ObjectId | string;
  description?: string;
  image?: string;
}
