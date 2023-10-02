
import dotenv from 'dotenv';
import { Request, Response} from 'express';
import {  AuthenticationError } from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
import {selfCareCategories} from '../../models/selfCareCategories';


// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();

interface QueryRequestBody {
	id: string;
}

interface CategoryRequestBody {
	categoryName: string,
	parent: string,
	image: string,
	description:string
}


const editCareCategories = async (req: Request , res: Response): Promise<void> => {

    try {

	 		const { id } = req.params as unknown as QueryRequestBody;

			 const { categoryName, parent, image, description } = req.body as CategoryRequestBody;

			const product = await selfCareCategories.findOne({ _id: id });

			if (!product) {
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					status: HTTP_STATUS.BAD_REQUEST,
					error: new AuthenticationError('No Records'),
				});
				return;
			}

			const updateData = {
				categoryName: categoryName && categoryName,
				parent: parent && parent,
				image: image && image,
				description: description && description
			};

			const updatedCategory = await selfCareCategories.findOneAndUpdate(
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
    }
};
export default editCareCategories;
