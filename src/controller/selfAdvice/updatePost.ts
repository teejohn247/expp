
import dotenv from 'dotenv';
import { Categories } from '../../models/categories';
import { Advice } from '../../models/advice';

import { Request, Response} from 'express';
import { validateCategory, } from '../../helpers/validations/authValidation';
import {AuthenticationError, UserInputError
} from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();


interface CategoryRequestBody {
	title: string,
	content: string,
	featuredImage: string,
	categoryId:string
	published:boolean
}
export interface CustomRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any; // Replace 'any' with the actual type of your payload
}

interface QueryRequestBody {
	id: string;
}

const updatePost = async (req: Request , res: Response): Promise<void> => {

    try {

		   	const { id } = req.params as unknown as QueryRequestBody;

        const { title, content, featuredImage, categoryId, published } = req.body as CategoryRequestBody;
				const { error } = validateCategory.validate(req.body);
				if (error) {
					res.status(HTTP_STATUS.BAD_REQUEST).json({
						status: HTTP_STATUS.BAD_REQUEST,
						error: new UserInputError(error.message),
					});
					return;
				}

				const customReq = req as CustomRequest;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				 const payloadData = customReq.payload;

				console.log({payloadData});
				const checkAdvice = await Advice.findOne({ _id: id });

				console.log({checkAdvice });

        if (!checkAdvice) {
					res.status(HTTP_STATUS.UNAUTHORIZED).json({
						status: HTTP_STATUS.UNAUTHORIZED,
						error: new AuthenticationError('Category does not exist'),
					});
            return;
        }

				const checkCategory = await Categories.findOne({ _id: categoryId });

        if (!checkCategory) {
					res.status(HTTP_STATUS.UNAUTHORIZED).json({
						status: HTTP_STATUS.UNAUTHORIZED,
						error: new AuthenticationError('Category does not exist'),
					});
            return;
        }

				const checkAccess = await Advice.findOne({ _id: id, authorId: payloadData.id});

				console.log({checkAccess });

        if (!checkAccess) {
					res.status(HTTP_STATUS.UNAUTHORIZED).json({
						status: HTTP_STATUS.UNAUTHORIZED,
						error: new AuthenticationError('Unauthorized'),
					});
            return;
        }

				const updateData = {
					title: title && title,
					content: content && content,
					featuredImage: featuredImage && featuredImage,
					categoryId: categoryId && categoryId,
					categoryName: categoryId && checkCategory.categoryName,
					published : published && published
				};

				const updatedCategory = await Advice.findOneAndUpdate(
					{ _id: id },
					updateData);

						if (!updatedCategory) {
								res.status(HTTP_STATUS.BAD_REQUEST).json({
									status: HTTP_STATUS.BAD_REQUEST,
									error: new AuthenticationError('Bad Request'),
								});
								return;
						} else {
							res.status(HTTP_STATUS.CREATED).json({
								status: HTTP_STATUS.CREATED,
								success: true,
								data: 'Update Successful'
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
export default updatePost;
