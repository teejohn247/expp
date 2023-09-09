
import dotenv from 'dotenv';
import { Request, Response} from 'express';
import { validateProducts, } from '../../helpers/validations/authValidation';
import { UserInputError } from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
import { Products } from '@root/models/products';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();


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


const createProducts = async (req: Request , res: Response): Promise<void> => {
	console.log('here');

    try {

        const { productName, description, price, category, brand, image, stockQuantity, shippingWeight, dimensions, isAvailable, manufacturerDetails,
				warranty, sku, tags, reviews, isFeatured } = req.body as ProductRequestBody;


				const { error } = validateProducts.validate(req.body);
				if (error) {
					res.status(HTTP_STATUS.BAD_REQUEST).json({
						status: HTTP_STATUS.BAD_REQUEST,
						error: new UserInputError(error.message),
					});
					return;
				}

       const products = new Products({
				productName,
				description,
				price,
				category,
				brand,
				image,
				stockQuantity,
				shippingWeight,
				dimensions,
				isAvailable,
				manufacturerDetails,
				warranty,
				sku,
				tags,
				reviews,
				isFeatured
        });

        await products.save();

      res.status(HTTP_STATUS.CREATED).json({
            status: HTTP_STATUS.CREATED,
            success: true,
            data: products
        });
				return;
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        });
				//  if (error) throw new InternalServerError(error);
    }
};
export default createProducts;
