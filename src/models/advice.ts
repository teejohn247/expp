import { IAdvice } from '@root/typings/model/advice';
import { model, Model, Schema } from 'mongoose';

const adviceSchema: Schema<IAdvice> = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  featuredImage: { type: String, required: true },
	authorName: { type: String, required: true },
  authorEmail: { type: String, required: true },
	categoryId:{ type: String, required: true },
	categoryName:{ type: String, required: true },
  published: { type: Boolean, default: false},
  // comments: [
  //   {
  //     author: {
  //       name: { type: String, required: true },
  //       email: { type: String, required: true },
  //     },
  //     content: { type: String, required: true },
  //     createdAt: { type: Date, default: Date.now },
  //   },
  // ],
},
{ timestamps: true },
);
export const Advice: Model<IAdvice> = model<IAdvice>(
  'advice',
   adviceSchema
);
