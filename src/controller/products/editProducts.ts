
import dotenv from 'dotenv';
import { Request, Response} from 'express';
import {  AuthenticationError } from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
import { Products } from '@root/models/products';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();

interface QueryRequestBody {
	id: string;
}

interface ProductRequestBody {
	productName?: string;
  description?: string;
  price?: number;
  category?: string;
  brand?: string;
  image?: string;
  stockQuantity?: number;
  shippingWeight?: number;
  dimensions?: object;
	isAvailable?: boolean;
  manufacturerDetails?: object;
  warranty?: object;
  sku?: string;
  tags?: [string];
  reviews?: [];
  isFeatured?: boolean;
}


const editProducts = async (req: Request , res: Response): Promise<void> => {

    try {

	 		const { id } = req.params as unknown as QueryRequestBody;


			 const { productName, description, price, category, brand, image, stockQuantity, shippingWeight, dimensions, isAvailable, manufacturerDetails,
				warranty, sku, tags, reviews, isFeatured } = req.body as ProductRequestBody;


			const product = await Products.findOne({ _id: id });

			if (!product) {
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					status: HTTP_STATUS.BAD_REQUEST,
					error: new AuthenticationError('No Records'),
				});
				return;
			}

			const updatedProduct = await Products.findOneAndUpdate(
				{ _id: id },
				{
					productName: productName ? productName : product.productName,
					description: description ? description : product.description,
					price: price ? price : product.price,
					category: category ? category : product.category,
					brand: brand ? brand : product.brand,
					image: image ? image : product.image,
					stockQuantity: stockQuantity ? stockQuantity : product.stockQuantity,
					shippingWeight: shippingWeight ? shippingWeight : product.shippingWeight,
					dimensions: dimensions ? dimensions : product.dimensions,
					isAvailable: isAvailable ? isAvailable : product.isAvailable,
					manufacturerDetails: manufacturerDetails ? manufacturerDetails : product.manufacturerDetails,
					warranty: warranty ? warranty : product.warranty,
					sku: sku ? sku : product.sku,
					tags: tags ? tags : product.tags,
					reviews: reviews ? reviews : product.reviews,
					isFeatured:isFeatured ? isFeatured : product.isFeatured
				},
			);

			if(updatedProduct){
				res.status(HTTP_STATUS.CREATED).json({
									status: HTTP_STATUS.CREATED,
									success: true,
									data: 'Update Successful'
							 });

							return;

			}else{
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					status: HTTP_STATUS.BAD_REQUEST,
					error: new AuthenticationError('Bad Request'),
				});
				return;
			}

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        });
    }
};
export default editProducts;
