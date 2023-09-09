import { model, Model, Schema, Types } from 'mongoose';
import { ICategory } from '../typings/model/categories';

const CategoriesSchema: Schema<ICategory> = new Schema(
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

export const Categories: Model<ICategory> = model<ICategory>(
  'Categories',
  CategoriesSchema
);

