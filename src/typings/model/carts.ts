import { Types } from 'mongoose';

export interface ICarts {
  user?: Types.ObjectId | string;
  product?: Types.ObjectId | string;
  items?: [];




}
