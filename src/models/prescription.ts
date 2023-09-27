import { model, Model, Schema } from 'mongoose';
import { IPrescription } from '../typings/model/prescription';


const PrescriptionSchema: Schema<IPrescription> = new Schema(
  {
		user: {
			type: String,
			required: true,
		},
		uploadedPrescriptionImage: {
			type: String,
			required: true,
		},
		prescribedDrugs:[{
			productId: {
				type: String,
		  },
			productName: {
					type: String,
			},
			image: {
					type: String,
			},
			dosage: {
					type: String,
			},
			date: {
				type: Date,
		  },
			price: {
				type: String,
		},
		}],
		morningReminder:{
			dateTime: {
				type: Date,
		  },
			repeatForNumberofDays: {
					type: Number,
			},
		},
		eveningReminder:{
			dateTime: {
				type: Date,
		  },
			repeatForNumberofDays: {
					type: Number,
			},
		},
	},
		{ timestamps: true }
	);
export const Prescription: Model<IPrescription> = model<IPrescription>(
  'Prescription',
  PrescriptionSchema
);

