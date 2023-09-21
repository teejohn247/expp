
import dotenv from 'dotenv';
import { Request, Response} from 'express';
import {  AuthenticationError } from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
import { Products } from '@root/models/products';
import { UserInputError } from '../../services/http_errors';
import { validateReviews } from '@root/helpers/validations/authValidation';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();

interface QueryRequestBody {
	id: string;
}

interface ReviewRequestBody {
  rating?: number;
  comment?: string;
  author?: string;
}
export interface CustomRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any; // Replace 'any' with the actual type of your payload
}


const addReview = async (req: Request , res: Response): Promise<void> => {

    try {

			const customReq = req as CustomRequest;
	   // eslint-disable-next-line @typescript-eslint/no-explicit-any
	    const payloadData = customReq.payload;
	 		const { id } = req.params as unknown as QueryRequestBody;


			 const { rating, comment } = req.body as ReviewRequestBody;

			 const { error } = validateReviews.validate(req.body);
			 if (error) {
				 res.status(HTTP_STATUS.BAD_REQUEST).json({
					 status: HTTP_STATUS.BAD_REQUEST,
					 error: new UserInputError(error.message),
				 });
				 return;
			 }



			const product = await Products.findOne({ _id: id });



			if (!product) {
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					status: HTTP_STATUS.BAD_REQUEST,
					error: new AuthenticationError('No Records'),
				});
				return;
			}

			console.log(product);


	const review = await	Products.findOneAndUpdate({ _id: id },
				{ $push: { reviews: {

						rating: rating && rating,
						comment: comment && comment,
						author: payloadData.fullNames,
						date: Date.now(),

				 }}
			 });


			if(review){
				res.status(HTTP_STATUS.CREATED).json({
									status: HTTP_STATUS.CREATED,
									success: true,
									data: 'Update Successful'
							 });

			}else{
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					status: HTTP_STATUS.BAD_REQUEST,
					error: new AuthenticationError('Bad Request'),
				});
				return;
			}



    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        });
    }
};
export default addReview;
