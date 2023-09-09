import { model, Model, Schema } from 'mongoose';
import { IProduct } from '../typings/model/products';


const ProductsSchema: Schema<IProduct> = new Schema(
  {
		productName: {
			type: String,
			required: true,
		},
		description:  {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		category:  {
			type: String,
			required: true,
		},
		brand:  {
			type: String,
		},
		stockQuantity:  {
			type: Number,
			required: true,
		},
		image:  {
			type: String,
			required: true,
		},
		sku: {
			type: String,
			unique: true,
		},
		tags:  {
			type: Array,
			required: true
		},
		reviews:[{
            rating: {
                type: Number,
            },
            comment: {
                type: String,
            },
						author: {
							type: String,
					},
					date: {
						type: Date,
				},
        }],
		isFeatured: {
			type: Boolean,
			default: false,
			required: true,
		},
		isAvailable: {
			type: Boolean,
			default: true,
		},
		shippingWeight: {
			type: Number,
		},
		dimensions:
		[{
				length: {
						type: Number,
				},
				width: {
						type: Number,
				},
				height: {
					type: Number,
			},
		}],
		manufacturerDetails:
		[{
				name: {
						type: String,
				},
				address: {
						type: String,
				},
				contact: {
					type: String,
			},
		}],
		warranty:
		[{
				type: {
						type: String,
				},
				expirationDate: {
						type: String,
				}
		}],
	},
		{ timestamps: true }
	);
export const Products: Model<IProduct> = model<IProduct>(
  'Products',
  ProductsSchema
);

