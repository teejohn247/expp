import { model, Model, Schema } from 'mongoose';
import { IConsult } from '../typings/model/consult';


const ConsultationSchema: Schema<IConsult> = new Schema(
  {
		user: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		time:{
			type: String,
			required: true,
		},
		patientName: {
			type: String,
			required: true,
		},
		age: {
			type: String,
			required: true,
		},
		consultationCategoryId: {
			type: String,
			required: true,
		},
		consultationCategoryName: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			required: true,
		},
		symptoms: {
			type: String,
			required: true,
		},
		status: { type: String, enum: ['scheduled', 'cancelled', 'completed'], default: 'scheduled' },
	},
		{ timestamps: true }
	);
export const Consultation: Model<IConsult> = model<IConsult>(
  'Consultation',
	ConsultationSchema
);

