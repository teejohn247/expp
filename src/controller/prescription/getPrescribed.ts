
import dotenv from 'dotenv';
import { Request, Response} from 'express';
import { UserInputError } from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
import { Prescription } from '@root/models/prescription';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();


export interface CustomRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any; // Replace 'any' with the actual type of your payload
}


const getPrescribed = async (req: Request , res: Response): Promise<void> => {
	console.log('here');

    try {

			const customReq = req as CustomRequest;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			 const payloadData = customReq.payload;

				console.log({payloadData});


				const prescription = await Prescription.find({user: payloadData?.id});

			if (!prescription) {

					res.status(HTTP_STATUS.NOT_FOUND).json({
						status: HTTP_STATUS.NOT_FOUND,
						error: new  UserInputError ('No Records'),
					});
				}else{
					res.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            success: true,
            data: prescription
        });
				return;

				}
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        });
				//  if (error) throw new InternalServerError(error);
    }
};
export default getPrescribed;
