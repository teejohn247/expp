
import dotenv from 'dotenv';
import { validateOtp } from '../../helpers/validations/authValidation';
import { UserInputError
} from '../../services/http_errors';
import { Request, Response} from 'express';
import HTTP_STATUS from 'http-status-codes';

dotenv.config();


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const client = require('twilio')(accountSid, authToken);

interface VerifyRequestBody {
	serviceSid: string;
	code: string;
	phoneNumber: string;
}

//Verify Code
const verifyToken  = async (req: Request , res: Response): Promise<void> => {


    try {
        const { serviceSid, code, phoneNumber } = req.body as unknown as VerifyRequestBody;
				const { error } = validateOtp.validate(req.body);
				if (error) {
					res.status(HTTP_STATUS.BAD_REQUEST).json({
						status: HTTP_STATUS.BAD_REQUEST,
						error: new UserInputError(error.message),
					});
					return;
				}

        await client.verify.v2.services(serviceSid)
            .verificationChecks
            .create({ to: phoneNumber, code: code }).then((verification: { status: string; }) =>{

                if(verification.status != 'approved'){
                    res.status(400).json({
                        status: 400,
                        success: false,
                        data: 'Invalid code'
                    });
                }else{

										res.status(HTTP_STATUS.OK).json({
											status: HTTP_STATUS.OK,
											success: true,
											verification

									});
                }
            });
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        });
    };
};

export default verifyToken;
