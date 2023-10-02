import { model, Model, Schema } from 'mongoose';
import { ICategory } from '../typings/model/categories';

const consultationCategoriesSchema: Schema<ICategory> = new Schema(
  {
		categoryName: {
			type: String,
			required: true,
			unique: true,
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

export const consultationCareCategories: Model<ICategory> = model<ICategory>(
  'consultationCategories',
	consultationCategoriesSchema
);

