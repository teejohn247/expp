
import dotenv from 'dotenv';
import { Categories } from '../../models/categories';
import { Advice } from '../../models/advice';

import { Request, Response} from 'express';
import {AuthenticationError
} from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();


interface QueryRequestBody {
	page: number;
	limit: number;
}

const fetchPosts = async (req: Request , res: Response): Promise<void> => {

    try {
			const { page, limit } = req.query as unknown as QueryRequestBody;

			const posts = await Advice.find()
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.exec();

			if (!posts) {
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					status: HTTP_STATUS.BAD_REQUEST,
					error: new AuthenticationError('No Records'),
				});
				return;
			}

			const count = await Categories.find().countDocuments();

      res.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            success: true,
            data: posts,
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
				//  if (error) throw new InternalServerError(error);
    }
};
export default fetchPosts;
