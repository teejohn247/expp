import { IAdmin } from '@root/typings/model/admin';
import { model, Model, Schema } from 'mongoose';

const AdminSchema: Schema<IAdmin> = new Schema(
  {
		fullNames: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
		role: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const Admin: Model<IAdmin> = model<IAdmin>(
  'Admin',
  AdminSchema
);
