import { Types } from 'mongoose';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

interface TokenPayload {
	id:  Types.ObjectId;
	fullNames: string;
	email: string;
}

dotenv.config();

// module.exports = {

// encodeToken: (id:Types.ObjectId, fullNames: string, email: string) : string => {

// const payload: TokenPayload = { id, fullNames, email };



// const options = { expiresIn: '10d' };
// const secret = process.env.SECRET_KEY as string;

// return jwt.sign(payload, secret, options);
//     },
// };

async function encodeToken(id:Types.ObjectId, fullNames: string, email: string)  {
	const payload: TokenPayload = {
		id, fullNames, email
	};
	const options = { expiresIn: '10d' };
	const secret = process.env.SECRET_KEY as string;;

	return jwt.sign(payload, secret, options);
	};

	export default encodeToken;
