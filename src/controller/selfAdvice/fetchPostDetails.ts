
import dotenv from 'dotenv';
import { Advice } from '../../models/advice';

import { Request, Response} from 'express';
import {AuthenticationError
} from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();



interface QueryRequestBody {
	id: string;
}

const fetchPostDetails = async (req: Request , res: Response): Promise<void> => {

    try {
			const { id } = req.params as unknown as QueryRequestBody;

			const posts = await Advice.find({_id: id});


			if (!posts) {
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					status: HTTP_STATUS.BAD_REQUEST,
					error: new AuthenticationError('No Records'),
				});
				return;
			}

      res.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            success: true,
            data: posts,
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
export default fetchPostDetails;
