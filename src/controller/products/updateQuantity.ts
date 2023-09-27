
import dotenv from 'dotenv';
import { Request, Response} from 'express';
import { UserInputError } from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
import { Carts } from '@root/models/carts';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();


export interface CustomRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}



const updateCart = async (req: Request , res: Response): Promise<void> => {
	console.log('here');

    try {

			const { cartId, itemId, quantity }: { cartId: string; itemId: string; quantity: number } = req.body;


			// Find the cart by its ID
			const cart  = await Carts.findById(cartId);

			if (!cart) {
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					status: HTTP_STATUS.BAD_REQUEST,
					error: new UserInputError('Cart not found'),
				});
				return;
			}

   // Find the cart and update the quantity of the specific item
	 const updatedCart = await Carts.findOneAndUpdate(
		{ _id: cartId, 'items._id': itemId }, // Find the cart by ID and the item by its ID
		{ $set: { 'items.$.quantity': quantity } }, // Update the quantity of the matched item
		{ new: true } // Return the updated cart after the update
	);

	console.log({updatedCart});

	if(updatedCart){
		res.status(HTTP_STATUS.CREATED).json({
							status: HTTP_STATUS.CREATED,
							success: true,
							data: 'Update Successful'
					 });

					return;

	}else{
		res.status(HTTP_STATUS.BAD_REQUEST).json({
			status: HTTP_STATUS.BAD_REQUEST,
			error: new UserInputError('Bad Request'),
		});
		return;
	}


    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        });
				//  if (error) throw new InternalServerError(error);
    }
};
export default updateCart;
