
import dotenv from 'dotenv';
import { Request, Response} from 'express';
import {  AuthenticationError } from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
import { UserInputError } from '../../services/http_errors';
import { validateDeliveryOptions } from '@root/helpers/validations/authValidation';
import { Delivery } from '@root/models/deliveryMethods';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();

interface QueryRequestBody {
	id: string;
}

interface ReviewRequestBody {
  optionName?: string;
  deliveryDate?: string;
  price?: string;

}
export interface CustomRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any; // Replace 'any' with the actual type of your payload
}


const addDeliveryOptions = async (req: Request , res: Response): Promise<void> => {

    try {

	   // eslint-disable-next-line @typescript-eslint/no-explicit-any
	 		const { id } = req.params as unknown as QueryRequestBody;


			 const { optionName, deliveryDate, price } = req.body as ReviewRequestBody;

			 const { error } = validateDeliveryOptions.validate(req.body);
			 if (error) {
				 res.status(HTTP_STATUS.BAD_REQUEST).json({
					 status: HTTP_STATUS.BAD_REQUEST,
					 error: new UserInputError(error.message),
				 });
				 return;
			 }



			const options = await Delivery.findOne({ _id: id });



			if (!options) {
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					status: HTTP_STATUS.BAD_REQUEST,
					error: new AuthenticationError('No Records'),
				});
				return;
			}



	const review = await	Delivery.findOneAndUpdate({ _id: id },
				{ $push: { deliveryOptions: {

						optionName: optionName && optionName,
						deliveryDate: deliveryDate && deliveryDate,
						price: price && price,

				 }}
			 });

			 console.log({review});


			if(review){
				res.status(HTTP_STATUS.CREATED).json({
									status: HTTP_STATUS.CREATED,
									success: true,
									data: 'Update Successful'
							 });
							 return;

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

export default addDeliveryOptions;
