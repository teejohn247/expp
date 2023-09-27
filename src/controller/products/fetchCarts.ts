import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { AuthenticationError } from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
import { Carts } from '@root/models/carts';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();


export interface CustomRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

const fetchCart = async (req: Request, res: Response): Promise<void> => {
	console.log(req.body);
	try {
		// const {category} = req.query as unknown as QueryRequestBody;

		const customReq = req as CustomRequest;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		 const payloadData = customReq.payload;


		const cart = await Carts.find({user: payloadData.id});


		if (!cart) {
			res.status(HTTP_STATUS.NOT_FOUND).json({
				status: HTTP_STATUS.NOT_FOUND,
				error: new AuthenticationError('Empty cart')
			});
			return;
		}


		res.status(HTTP_STATUS.OK).json({
			status: HTTP_STATUS.OK,
			success: true,
			data: cart,

		});
		return;
	} catch (error) {
		res.status(500).json({
			status: 500,
			success: false,
			error: error
		});
	}
};
export default fetchCart;
