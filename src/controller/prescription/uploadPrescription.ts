
import dotenv from 'dotenv';
import { Request, Response} from 'express';
import { validateUploadPrescription } from '../../helpers/validations/authValidation';
import { UserInputError } from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
import { Prescription } from '@root/models/prescription';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();


interface ProductRequestBody {
	user?: string;
  image?: string;

}
export interface CustomRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any; // Replace 'any' with the actual type of your payload
}


const uploadPrescription = async (req: Request , res: Response): Promise<void> => {
	console.log('here');

    try {

			const customReq = req as CustomRequest;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			 const payloadData = customReq.payload;
        const { image } = req.body as ProductRequestBody;

				console.log({payloadData});


				const { error } = validateUploadPrescription.validate(req.body);
				if (error) {
					res.status(HTTP_STATUS.BAD_REQUEST).json({
						status: HTTP_STATUS.BAD_REQUEST,
						error: new UserInputError(error.message),
					});
					return;
				}

       const prescription = new Prescription({
				user: payloadData.id,
				uploadedPrescriptionImage: image,
        });

        await prescription.save();

      res.status(HTTP_STATUS.CREATED).json({
            status: HTTP_STATUS.CREATED,
            success: true,
            data: prescription
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
export default uploadPrescription;
