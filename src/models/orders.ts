import { model, Model, Schema} from 'mongoose';
import { IOrders } from '../typings/model/orders';

const ordersSchema: Schema<IOrders> = new Schema({
	orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  customer: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      product: {
        type: String,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
	delivery: {
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
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
},
  { timestamps: true }
);

export const Orders: Model<IOrders> = model<IOrders>(
  'Orders',
   ordersSchema
);

