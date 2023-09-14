import { model, Model, Schema} from 'mongoose';
import { IDelivery } from '../typings/model/delivery';

const deliverySchema: Schema<IDelivery> = new Schema(
  {
		name: {
			type: String,
			required: true,
			unique: true,
		},
		logo: {
			type: String,
			required: true,
		},
		deliveryOptions:[{
			optionName: {
					type: String,
			},
			deliveryDate: {
				type: String,
		},
			price: {
					type: String,
			}
	}],
  },
  { timestamps: true }
);

export const Delivery: Model<IDelivery> = model<IDelivery>(
  'Delivery',
   deliverySchema
);

