
import dotenv from 'dotenv';
import {Categories} from '../../models/categories';
import { Request, Response} from 'express';
import { validateCategory, } from '../../helpers/validations/authValidation';
import {AuthenticationError, UserInputError
} from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();


interface CategoryRequestBody {
	categoryName: string,
	parent: string,
	image: string,
	description:string
}


const createCategories = async (req: Request , res: Response): Promise<void> => {

    try {
        const { categoryName, parent, image, description } = req.body as CategoryRequestBody;
				const { error } = validateCategory.validate(req.body);
				if (error) {
					res.status(HTTP_STATUS.BAD_REQUEST).json({
						status: HTTP_STATUS.BAD_REQUEST,
						error: new UserInputError(error.message),
					});
					return;
				}


				const checkCategory = await Categories.findOne({ categoryName });

				console.log({checkCategory });

        if (checkCategory) {
					res.status(HTTP_STATUS.UNAUTHORIZED).json({
						status: HTTP_STATUS.UNAUTHORIZED,
						error: new AuthenticationError(`Category with name ${categoryName} already exist`),
					});
            return;
        }

       const category = new Categories({
					categoryName,
					parent,
					image,
					description
        });

        await category.save();

      res.status(HTTP_STATUS.CREATED).json({
            status: HTTP_STATUS.CREATED,
            success: true,
            data: category
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
export default createCategories;
