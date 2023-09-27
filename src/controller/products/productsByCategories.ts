
import dotenv from 'dotenv';
import { Request, Response} from 'express';
import {  AuthenticationError } from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
import { Products } from '@root/models/products';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();

interface QueryRequestBody {
	category: string;
}


const productsByCategories = async (req: Request , res: Response): Promise<void> => {

			try {

				 const {category} = req.query as unknown as QueryRequestBody;



				const products = await Products.find({category});


				if (!products) {
					res.status(HTTP_STATUS.BAD_REQUEST).json({
						status: HTTP_STATUS.BAD_REQUEST,
						error: new AuthenticationError('No Records'),
					});
					return;
				}
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
			};

};
export default productsByCategories;
