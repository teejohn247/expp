import { model, Model, Schema, Types } from 'mongoose';
import { ICategory } from '../typings/model/categories';

const selfCareCategoriesSchema: Schema<ICategory> = new Schema(
  {
		categoryName: {
			type: String,
			required: true,
			unique: true,
		},
		parent: {
			type: Types.ObjectId,
			ref: 'Categories',
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		}
  },
  { timestamps: true }
);

export const selfCareCategories: Model<ICategory> = model<ICategory>(
  'selfCareCategories',
   selfCareCategoriesSchema
);

