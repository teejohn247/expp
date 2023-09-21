
import dotenv from 'dotenv';
import {User} from '../../models/credentialModel';
import bcrypt from 'bcrypt';
// import utils from '../../config/utils';
import { Request, Response} from 'express';
import { validateRegisterUser } from '../../helpers/validations/authValidation';
import {AuthenticationError, UserInputError
} from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

interface RegistrationRequestBody {
	fullNames: string;
	email: string;
	mophethPremium: boolean;
	mophethPremiumCardNumber: string;
	verificationChannel: string;
	phoneNumber: string;
	password: string;
}
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const client = require('twilio')(accountSid, authToken);

const register = async (req: Request , res: Response): Promise<void> => {

    try {


        const { fullNames, email, mophethPremium, mophethPremiumCardNumber, verificationChannel, phoneNumber, password } = req.body as RegistrationRequestBody;

				const { error } = validateRegisterUser.validate(req.body);
				if (error) {
					res.status(HTTP_STATUS.BAD_REQUEST).json({
						status: HTTP_STATUS.BAD_REQUEST,
						error: new UserInputError(error.message),
					});
					return;
				}

				const checkEmail = await User.findOne({ email });


        if (checkEmail) {
					res.status(HTTP_STATUS.UNAUTHORIZED).json({
						status: HTTP_STATUS.UNAUTHORIZED,
						error: new AuthenticationError('User already exist'),
					});
            return;
        }


        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

				// let service_sid;

			// const chh =	await client.verify.services.create({ friendlyName: 'MOPHETH', codeLength: 4});


		// 		await client.verify.v2.services.create({ friendlyName: 'MOPHETH', codeLength: 4}).then((service: { sid: unknown }) => service_sid = service.sid);
		// 		console.log({service_sid});
		// 		console.log({phoneNumber});


        // const verificationCode = await client.verify.services(service_sid)
        // .verifications
        // .create({
        //     to: phoneNumber,
        //     channel: 'sms',
        // });

		// 	  console.log({verificationCode});


       const user = new User({
				fullNames,
				email,
				mophethPremium,
				mophethPremiumCardNumber,
				verificationChannel,
				phoneNumber,
				password: hashed
        });

        await user.save();

      res.status(HTTP_STATUS.CREATED).json({
            status: HTTP_STATUS.CREATED,
            success: true,
            data: user,
			// otp: verificationCode

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
export default register;
