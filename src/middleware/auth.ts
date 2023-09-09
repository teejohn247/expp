/* eslint-disable no-undef */
// import jwt from 'jsonwebtoken';
import { Request, Response} from 'express';
import dotenv from 'dotenv';
import {  AuthenticationError } from '../services/http_errors';
import HTTP_STATUS from 'http-status-codes';
import jwt, { VerifyErrors } from 'jsonwebtoken';

dotenv.config();

// Extend the Request type to include the decoded property
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      payload?: unknown; // Replace 'any' with the actual type of your decoded data
    }
  }
}

const auth = async (req: Request , res: Response, next: () => void): Promise<void> => {
  try {

		const token = req.headers.authorization?.replace('Bearer ', ''); // Assuming it's in the 'Authorization' header

		if (!token) {
						res.status(HTTP_STATUS.UNAUTHORIZED).json({
				status: HTTP_STATUS.UNAUTHORIZED,
				error: new AuthenticationError('Unauthorized'),
			});
			return;
		}

		// Your JWT secret key. Replace this with your actual secret key.
		const secretKey = process.env.SECRET_KEY;

		jwt.verify(token, secretKey as string, (err: VerifyErrors | null, decoded: unknown) => {
			if (err) {
				res.status(HTTP_STATUS.FORBIDDEN).json({
					status: HTTP_STATUS.FORBIDDEN,
					error: new AuthenticationError('Token is invalid or expired'),
				});
			}

			req.payload = decoded;
    next();
		});
  } catch (error) {
			res.status(HTTP_STATUS.UNAUTHORIZED).json({
				status: HTTP_STATUS.UNAUTHORIZED,
				error: new AuthenticationError('Invalid Token'),
			});
  }

};

export default auth;
