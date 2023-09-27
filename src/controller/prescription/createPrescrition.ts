
import dotenv from 'dotenv';
import { Request, Response} from 'express';
import { AuthenticationError} from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
import { Prescription } from '@root/models/prescription';
import { Products } from '@root/models/products';


// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();


interface ProductRequestBody {
	productId?: string;
  dosage?: object;
  date?: object;
}
interface QueryRequestBody {
	id: string;
}

const createPrescription = async (req: Request , res: Response): Promise<void> => {
	console.log('here');

    try {

			const { id } = req.params as unknown as QueryRequestBody;


			// eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { productId, dosage, date } = req.body as ProductRequestBody;
				const options = await Prescription.findOne({ _id: id });
				const product = await Products.findOne({ _id: productId });


				if (!product) {
					res.status(HTTP_STATUS.BAD_REQUEST).json({
						status: HTTP_STATUS.BAD_REQUEST,
						error: new AuthenticationError('Product does not exist'),
					});
					return;
				}

				if (!options) {
					res.status(HTTP_STATUS.BAD_REQUEST).json({
						status: HTTP_STATUS.BAD_REQUEST,
						error: new AuthenticationError('No Records'),
					});
					return;
				}
				const prescription = await	Prescription.findOneAndUpdate({ _id: id },
					{ $push: { prescribedDrugs: {
						productId: productId && productId,
						productName: product && product.productName,
						image: product.image && product.image,
						dosage: dosage && dosage,
						date: date && date,
						price: product.price && product.price
					 }}
				 });
				 if(prescription){
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
				//  if (error) throw new InternalServerError(error);
    }
};
export default createPrescription;
