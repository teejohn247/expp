
import dotenv from 'dotenv';
import { Request, Response} from 'express';
import { AuthenticationError, UserInputError} from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
import { Orders } from '@root/models/orders';
import { Transactions } from '@root/models/transactions';
import { validateOrders } from '@root/helpers/validations/authValidation';




// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();


interface OrderRequestBody {
  orderNumber?: string;
  customer?: object;
  orderDate?: Date;
  products?: string;
  totalAmount?: number;
	delivery?: string;
  status?: string;
  referenceId?: string;
  paymentTransferRef?: string;


}

export interface CustomRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any; // Replace 'any' with the actual type of your payload
}


const createOrder = async (req: Request , res: Response): Promise<void> => {
	console.log('here');

    try {

			const customReq = req as CustomRequest;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			 const payloadData = customReq.payload;


 			// eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { orderNumber, orderDate, customer, products, totalAmount, delivery, status, referenceId, paymentTransferRef } = req.body as OrderRequestBody;


				const { error } = validateOrders.validate(req.body);
				if (error) {
					res.status(HTTP_STATUS.BAD_REQUEST).json({
						status: HTTP_STATUS.BAD_REQUEST,
						error: new UserInputError(error.message),
					});
					return;
				}


				const orders = new Orders({
					orderNumber,
					orderDate,
					customer,
					products,
					totalAmount,
					delivery,
					status,
					referenceId,
					paymentTransferRef
					});

					await orders.save();

					const transaction = new Transactions({
						user: payloadData.id,
						email: payloadData.email,
						amount: totalAmount,
						referenceId,
						paymentTransferRef
						});

						await transaction.save();
				 if(orders){
					res.status(HTTP_STATUS.CREATED).json({
										status: HTTP_STATUS.CREATED,
										success: true,
										data: orders
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
export default createOrder;
