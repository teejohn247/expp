
import dotenv from 'dotenv';
import {User} from '../../models/credentialModel';
import bcrypt from 'bcrypt';
// import encodeToken from '../../config/utils';
import { Request, Response} from 'express';
import { validateLogin } from '../../helpers/validations/authValidation';
import {AuthenticationError, UserInputError
} from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import encodeToken from '../../config/utils';


dotenv.config();


interface LoginRequestBody {
	email: string;
	password: string;
}

const login = async (req: Request , res: Response): Promise<void> => {

    try {
        const { email, password } = req.body as LoginRequestBody;

				const { error } = validateLogin.validate(req.body);
				if (error) {
					res.status(HTTP_STATUS.BAD_REQUEST).json({
						status: HTTP_STATUS.BAD_REQUEST,
						error: new UserInputError(error.message),
					});
					return;
				}

				const user = await User.findOne({ email });

        if (!user) {
					res.status(HTTP_STATUS.BAD_REQUEST).json({
						status: HTTP_STATUS.BAD_REQUEST,
						error: new AuthenticationError(`User with email: ${email} does not exist`),
					});
            return;
        }


				const isMatch = await bcrypt.compare(password, user.password as string);

				if (!isMatch) {
					res.status(HTTP_STATUS.BAD_REQUEST).json({
						status: HTTP_STATUS.BAD_REQUEST,
						error: new AuthenticationError('Invalid login credentials'),
					});
            return;
        }

        const token = await encodeToken(user?._id, user?.fullNames as string, email);
				console.log({token});

        res.status(HTTP_STATUS.CREATED).json({
            status: HTTP_STATUS.CREATED,
            success: true,
            data: user,
            token: token
        });
				return;
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        });
    }
};
export default login;
