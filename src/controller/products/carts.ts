
import dotenv from 'dotenv';
import { Request, Response} from 'express';
import { validateCart } from '../../helpers/validations/authValidation';
import { UserInputError } from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
import { Products } from '@root/models/products';
import { Carts } from '@root/models/carts';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();


interface ProductRequestBody {
	productId?: string;
  quantity?: number;


}

interface CartItem {
  product: string; // or mongoose.Types.ObjectId
  quantity: number;
	productName: string,
	price: number,
	productImage: string,
}



export interface CustomRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

const createCarts = async (req: Request , res: Response): Promise<void> => {
	console.log('here');

    try {

        const { productId, quantity } = req.body as ProductRequestBody;

				const customReq = req as CustomRequest;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				 const payloadData = customReq.payload;

					console.log({payloadData});

				const { error } = validateCart.validate(req.body);
				if (error) {
					res.status(HTTP_STATUS.BAD_REQUEST).json({
						status: HTTP_STATUS.BAD_REQUEST,
						error: new UserInputError(error.message),
					});
					return;
				}

				let cart = await Carts.findOne({ user: payloadData.id });

				if (!cart) {
					cart = new Carts({ user: payloadData.id, items: [] });
				}
				const product = await Products.findById(productId);
				console.log({product});

				if (!product) {
					res.status(HTTP_STATUS.BAD_REQUEST).json({
						status: HTTP_STATUS.BAD_REQUEST,
						error: new UserInputError('Product not found'),
					});
					return;
				}
					const cartItems: CartItem[] = cart.items ?? [];

					const existingItemIndex: number = cartItems && cartItems?.findIndex((item: CartItem) => item.product?.toString() === productId);

					if (existingItemIndex !== -1) {
						// If the product already exists, update the quantity
						cartItems[existingItemIndex].quantity += quantity as number;
					} else {
						// If the product is not in the cart, add it as a new item
						const newItem: CartItem = {
							product: productId as string,
							quantity: quantity as number,
							productName: product.productName as string,
							price: product.price as number,
							productImage: product.image as string,
						};
						cartItems.push(newItem);
					}


        await cart.save();

       res.status(HTTP_STATUS.CREATED).json({
            status: HTTP_STATUS.CREATED,
            success: true,
            data: cart
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
export default createCarts;
