import { ICarts } from '@root/typings/model/carts';
import { model, Model, Schema, Types} from 'mongoose';

// const cartItemSchema = new Schema({
//   product: {
//     type: Types.ObjectId, // Reference to the Product model
//     ref: 'Product',
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     default: 1,
//     min: 1,
//   },
// });


const CartsSchema: Schema<ICarts> = new Schema(
  {
		user: {
			type: String,
			required: true,
		},
		items: [
			{ product: {
			type: Types.ObjectId, // Reference to the Product model
			ref: 'Product',
			required: true,
		},
		quantity: {
			type: Number,
			default: 1,
			min: 1,
		},
		productName: {
			type: String, // Reference to the Product model
		},
		price: {
			type: Number,

		},
		productImage: {
			type: String
		}
	}
	],
  },
  { timestamps: true }
);

export const Carts: Model<ICarts> = model<ICarts>(
  'Carts',
	 CartsSchema
);
