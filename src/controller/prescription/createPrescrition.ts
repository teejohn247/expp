
import dotenv from 'dotenv';
import { Request, Response} from 'express';
import { AuthenticationError} from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
import { Prescription } from '@root/models/prescription';
import { Products } from '@root/models/products';


// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();


interface ProductRequestBody {
  prescribedDrugs: Drug[]; // Drug is the interface for the objects inside the array
}

interface Drug {
  productId: string;
  dosage: string;
}
interface QueryRequestBody {
	id: string;
}

const createPrescription = async (req: Request , res: Response): Promise<void> => {
	console.log('here');

    try {

			const { id } = req.params as unknown as QueryRequestBody;


			// eslint-disable-next-line @typescript-eslint/no-explicit-any

        const { prescribedDrugs } = req.body as ProductRequestBody;
				const options = await Prescription.findOne({ _id: id });
				// const product = await Products.findOne({ _id: productId });

				const dosages: { productId: string; productName: string | undefined ; image: string | undefined; dosage: string; date: number; price: number | undefined; }[] = [];

				await Promise.all(
				prescribedDrugs?.map(async (dose) => {
				  const productDetails = await Products.findOne({ _id: dose?.productId as string});

					if (!productDetails) {
						res.status(HTTP_STATUS.BAD_REQUEST).json({
							status: HTTP_STATUS.BAD_REQUEST,
							error: new AuthenticationError(`Product with id ${dose?.productId} does not exist`),
						});
						return;
					}
					dosages.push({
						productId: dose?.productId as unknown as string,
						productName: productDetails.productName && productDetails.productName,
						image: productDetails?.image && productDetails.image,
						dosage: dose?.dosage && dose.dosage,
						date: Date.now(),
						price: productDetails?.price && productDetails.price
				});
			}));
				if (!options) {
					res.status(HTTP_STATUS.BAD_REQUEST).json({
						status: HTTP_STATUS.BAD_REQUEST,
						error: new AuthenticationError('No Records'),
					});
					return;
				}

				console.log({dosages});

				const prescription = await Prescription.findOneAndUpdate({ _id: id },
					{ $push: { prescribedDrugs:  { $each: dosages } } }
				 );

				 console.log({prescription});
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
				return;
				//  if (error) throw new InternalServerError(error);
    }
};
export default createPrescription;
