
import dotenv from 'dotenv';
import { Request, Response} from 'express';
import {  AuthenticationError } from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
// import { Delivery } from '@root/models/deliveryMethods';
import { Prescription } from '@root/models/prescription';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();

interface QueryRequestBody {
	id: string;
}

interface ReviewRequestBody {
  morningReminder?: object;
  eveningReminder?: object;
  price?: string;

}
export interface CustomRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any; // Replace 'any' with the actual type of your payload
}



const saveReminder = async (req: Request , res: Response): Promise<void> => {

    try {

	   // eslint-disable-next-line @typescript-eslint/no-explicit-any
	 		const { id } = req.params as unknown as QueryRequestBody;


			 const { morningReminder, eveningReminder } = req.body as ReviewRequestBody;

			const options = await Prescription.findOne({ _id: id });
			if (!options) {
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					status: HTTP_STATUS.BAD_REQUEST,
					error: new AuthenticationError('No Records'),
				});
				return;
			}

			 const updatePrescription = await Prescription.updateOne({

					morningReminder: morningReminder && morningReminder,
					eveningReminder: eveningReminder && eveningReminder

		  });


			if(updatePrescription){
				res.status(HTTP_STATUS.CREATED).json({
									status: HTTP_STATUS.CREATED,
									success: true,
									data: 'Reminder Set'
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

export default saveReminder;
