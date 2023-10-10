
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
// import utils from '../../config/utils';
import { Request, Response} from 'express';
import { validateRegisterAdmin } from '../../helpers/validations/authValidation';
import {AuthenticationError, UserInputError
} from '../../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
import { Admin } from '@root/models/addAdmin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config();


interface RegistrationRequestBody {
	fullNames?: string;
  email?: string;
  role?: string;
  password?: string;
}


// eslint-disable-next-line @typescript-eslint/no-var-requires
const sgMail = require('@sendgrid/mail');

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_KEY);


// eslint-disable-next-line @typescript-eslint/no-var-requires

const addAdmin = async (req: Request , res: Response): Promise<void> => {

    try {


        const { fullNames, role, email, password } = req.body as RegistrationRequestBody;

				const { error } = validateRegisterAdmin.validate(req.body);
				if (error) {
					res.status(HTTP_STATUS.BAD_REQUEST).json({
						status: HTTP_STATUS.BAD_REQUEST,
						error: new UserInputError(error.message),
					});
					return;
				}

				const checkEmail = await Admin.findOne({ email });


        if (checkEmail) {
					res.status(HTTP_STATUS.UNAUTHORIZED).json({
						status: HTTP_STATUS.UNAUTHORIZED,
						error: new AuthenticationError('Admin already exist'),
					});
            return;
        }


        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password as string, salt);


       const admin = new Admin({
				fullNames,
				email,
				role,
				password: hashed
        });

        await admin.save();



      //   let data = `<div>
      //   <p style="padding: 32px 0; font-weight: 700; font-size: 20px;font-family: 'DM Sans';">
      //   Hi ${contactPerson},
      //   </p>

      //   <p style="font-size: 16px;font-weight: 300;">

      //   Your school has been invited to the Nigenius SMS Platform.
      //   complete your registeration using this link
      //   <a href="http://${subDomain.toLowerCase()}.nigenius.ng/signup/?token=${token}&email=${schoolEmail}&firstName=${contactPerson}&tenantID=${subDomain}">Complete Setup</a>

      //   <br><br>
      //   </p>

      //   <div>`

      //  let resp = emailTemp(data, 'School Officially Added to Nigenius SMS Platform')


      //   const msg = {
      //       to: schoolEmail, // Change to your recipient
      //       subject: 'Invitation Notification',
      //       from: {
      //           email:'smsnebula@nigenius.ng',
      //           name: "Nigenius SMS"
      //       },
      //       html: `${resp}`
      //   }

      res.status(HTTP_STATUS.CREATED).json({
            status: HTTP_STATUS.CREATED,
            success: true,
            data: admin,

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
export default addAdmin;
