import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { AuthenticationError } from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
import { Products } from '@root/models/products';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();

interface QueryRequestBody {
	page: number;
	limit: number;
	category: string;
}

const fetchProducts = async (req: Request, res: Response): Promise<void> => {
	console.log(req.body);
	try {
		// const {category} = req.query as unknown as QueryRequestBody;

		const { page, limit, category } = req.query as unknown as QueryRequestBody;

		const products = await Products.find()
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.exec();

		if (category) {
			const products = await Products.find({ category })
				.limit(limit * 1)
				.skip((page - 1) * limit)
				.exec();

				console.log({products});

			if (products.length < 1) {
				res.status(HTTP_STATUS.NOT_FOUND).json({
					status: HTTP_STATUS.NOT_FOUND,
					error: new AuthenticationError('No Records')
				});
				return;
			}

			const count = await Products.find().countDocuments();

			res.status(HTTP_STATUS.OK).json({
				status: HTTP_STATUS.OK,
				success: true,
				data: products,
				totalPages: Math.ceil(count / limit),
				currentPage: page
			});

			return;
		}

		if (!products) {
			res.status(HTTP_STATUS.NOT_FOUND).json({
				status: HTTP_STATUS.NOT_FOUND,
				error: new AuthenticationError('No Records')
			});
			return;
		}

		const count = await Products.find().countDocuments();

		res.status(HTTP_STATUS.OK).json({
			status: HTTP_STATUS.OK,
			success: true,
			data: products,
			totalPages: Math.ceil(count / limit),
			currentPage: page
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
export default fetchProducts;
