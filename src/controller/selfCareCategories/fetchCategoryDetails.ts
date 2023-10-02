
import dotenv from 'dotenv';
import { Request, Response} from 'express';
import {  AuthenticationError } from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
import {selfCareCategories} from '../../models/selfCareCategories';


// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();

interface QueryRequestBody {
	id: string;
}

const fetchCareCategoriesDetails = async (req: Request , res: Response): Promise<void> => {

    try {

			const { id } = req.params as unknown as QueryRequestBody;

			const category = await selfCareCategories.findOne({_id: id});
			console.log({category});

			if (!category) {
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					status: HTTP_STATUS.BAD_REQUEST,
					error: new AuthenticationError('No Records'),
				});
				return;
			}

      res.status(HTTP_STATUS.CREATED).json({
            status: HTTP_STATUS.CREATED,
            success: true,
            data: category
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
export default fetchCareCategoriesDetails;
