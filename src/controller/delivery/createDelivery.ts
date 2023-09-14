
import dotenv from 'dotenv';
import { Request, Response} from 'express';
import { validateDelivery } from '../../helpers/validations/authValidation';
import { UserInputError } from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
import { Delivery } from '@root/models/deliveryMethods';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();


interface ProductRequestBody {

		name?: string;
		image?: string;
		deliveryOptions?: [];


}


const createDelivery = async (req: Request , res: Response): Promise<void> => {
	console.log('here');

    try {

        const { name, image, deliveryOptions } = req.body as ProductRequestBody;


				const { error } = validateDelivery.validate(req.body);

				console.log({error});
				if (error) {
					res.status(HTTP_STATUS.BAD_REQUEST).json({
						status: HTTP_STATUS.BAD_REQUEST,
						error: new UserInputError(error.message),
					});
					return;
				}

       const delivery = new Delivery({
				name,
				logo: image,
				deliveryOptions
        });

        await delivery.save();

      res.status(HTTP_STATUS.CREATED).json({
            status: HTTP_STATUS.CREATED,
            success: true,
            data: delivery
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
export default createDelivery;
