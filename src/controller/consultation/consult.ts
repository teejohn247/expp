
import dotenv from 'dotenv';
import { Request, Response} from 'express';
import {  AuthenticationError } from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
// import { Delivery } from '@root/models/deliveryMethods';
import { Types } from 'mongoose';
import { Consultation } from '@root/models/consultation';
import { consultationCareCategories } from '@root/models/consultationCategories';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();

interface ReviewRequestBody {
  user?: Types.ObjectId | string;
	date?: Date;
	time?: string;
	patientName?: string;
	age?: string;
	consultationCategoryId?: string;
	consultationCategoryName?: string;
	gender?: string;
	symptoms?: string;

}
export interface CustomRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any; // Replace 'any' with the actual type of your payload
}


export interface CustomRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any; // Replace 'any' with the actual type of your payload
}

const consult = async (req: Request , res: Response): Promise<void> => {

    try {



			 const customReq = req as CustomRequest;
			 // eslint-disable-next-line @typescript-eslint/no-explicit-any
				const payloadData = customReq.payload;
			 const { date, time, patientName, age, consultationCategoryId, gender, symptoms } = req.body as ReviewRequestBody;

			const consult = await consultationCareCategories.findOne({ _id: consultationCategoryId });


			 const consultation = await Consultation.updateOne({
				user: payloadData.id,
				date,
				time,
				patientName,
				age,
				consultationCategoryId,
				consultationCategoryName: consult?.categoryName,
				gender,
				symptoms,
				status: 'scheduled'

		  });

			if(consultation){
				res.status(HTTP_STATUS.CREATED).json({
									status: HTTP_STATUS.CREATED,
									success: true,
									data: 'Success'
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

export default consult;
