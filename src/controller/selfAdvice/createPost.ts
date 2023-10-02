
import dotenv from 'dotenv';
import { selfCareCategories } from '../../models/selfCareCategories';
import { User } from '../../models/credentialModel';
import { Advice } from '../../models/advice';

import { Request, Response} from 'express';
import { validatePost } from '../../helpers/validations/authValidation';
import {AuthenticationError, UserInputError
} from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();


interface CategoryRequestBody {
	title: string,
	content: string,
	image: string,
	categoryId:string
}
export interface CustomRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any; // Replace 'any' with the actual type of your payload
}

const createPost = async (req: Request , res: Response): Promise<void> => {

    try {
        const { title, content, image, categoryId } = req.body as CategoryRequestBody;
				const { error } = validatePost.validate(req.body);
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
				const checkCategory = await selfCareCategories.findOne({ _id: categoryId });

				console.log({checkCategory });

        if (!checkCategory) {
					res.status(HTTP_STATUS.UNAUTHORIZED).json({
						status: HTTP_STATUS.UNAUTHORIZED,
						error: new AuthenticationError('Category does not exist'),
					});
            return;
        }

				const checkUser = await User.findOne({ _id: payloadData.id});

				console.log({checkUser });

        if (!checkUser) {
					res.status(HTTP_STATUS.UNAUTHORIZED).json({
						status: HTTP_STATUS.UNAUTHORIZED,
						error: new AuthenticationError('User does not exist'),
					});
            return;
        }

       const post = new Advice({
					title,
					content,
					categoryId,
					featuredImage: image,
					categoryName: checkCategory.categoryName,
					authorId: payloadData.id,
					authorName:checkUser?.fullNames,
					authorEmail:checkUser?.email,

        });

        await post.save();

      res.status(HTTP_STATUS.CREATED).json({
            status: HTTP_STATUS.CREATED,
            success: true,
            data: post
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
export default createPost;
