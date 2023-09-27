
import dotenv from 'dotenv';
import { Request, Response} from 'express';
import {  AuthenticationError } from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
import { Categories } from '@root/models/categories';
import { Products } from '@root/models/products';


// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();

interface QueryRequestBody {
	category: string;
}


const getSubCategories = async (req: Request , res: Response): Promise<void> => {

    try {

	 		const { category } = req.query as unknown as QueryRequestBody;

			// const products = await Categories.find()
			// .limit(limit * 1)
			// .skip((page - 1) * limit)
			// .exec();

			const categories = await Categories.find({parent: category});

			if (!categories) {

				const products = await Products.find({category});
				if (!products) {
					res.status(HTTP_STATUS.BAD_REQUEST).json({
						status: HTTP_STATUS.BAD_REQUEST,
						error: new AuthenticationError('No Records'),
					});
					return;
				}else{
					res.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            success: true,
            data: products
        });
				return;

				}
			}
      res.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            success: true,
            data: categories,
        });
				return;
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        });
				return;

    }
};
export default getSubCategories;
