
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

const deleteCart = async (req: Request , res: Response): Promise<void> => {
	console.log('here');

    try {

			const { cartId, itemIdToDelete }: { cartId: string; itemIdToDelete: string } = req.body;

			// Find the cart by its ID
			const cart = await Carts.findById(cartId);

			if (!cart) {
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					status: HTTP_STATUS.BAD_REQUEST,
					error: new UserInputError('Cart not found'),
				});
				return;
			}

			// Find the index of the item to delete
			const itemIndex = cart.items?.findIndex((item: { id: string; }) => item.id === itemIdToDelete);

			if (itemIndex === -1) {
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					status: HTTP_STATUS.BAD_REQUEST,
					error: new UserInputError('Item not found in cart'),
				});
				return;
			}

			// Remove the item from the cart's items array
			cart.items?.splice(itemIndex as number, 1);

			// Save the updated cart

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
export default deleteCart;
