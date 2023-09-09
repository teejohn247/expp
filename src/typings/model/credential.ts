import { Types } from 'mongoose';

export interface ICredential {
  userId?: Types.ObjectId | string;
  fullNames?: string;
  email?: string;
  mophethPremium?: boolean;
  mophethPremiumCardNumber?: string;
  verificationChannel?: string;
  phoneNumber?: string;
  password?: string;
}
