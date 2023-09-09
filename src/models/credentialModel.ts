import { model, Model, Schema } from 'mongoose';
import { ICredential } from '../typings/model/credential';

const UserSchema: Schema<ICredential> = new Schema(
  {
		fullNames: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
		mophethPremium: {
      type: Boolean,
      required: true
    },
		mophethPremiumCardNumber: {
      type: String,
      required: false
    },
		verificationChannel: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const User: Model<ICredential> = model<ICredential>(
  'User',
  UserSchema
);
