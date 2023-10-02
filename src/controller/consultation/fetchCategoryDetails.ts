
import dotenv from 'dotenv';
import { Request, Response} from 'express';
import {  AuthenticationError } from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
import {consultationCareCategories} from '../../models/consultationCategories';


// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();

interface QueryRequestBody {
	id: string;
}

const fetchConsultationCategoriesDetails = async (req: Request , res: Response): Promise<void> => {

    try {

			const { id } = req.params as unknown as QueryRequestBody;

			const category = await consultationCareCategories.findOne({_id: id});
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
export default fetchConsultationCategoriesDetails;
