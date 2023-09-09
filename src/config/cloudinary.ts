/* eslint-disable @typescript-eslint/no-var-requires */
// import { config, uploader } from 'cloudinary';
const cloudinary = require('cloudinary').v2;
import { Request, Response} from 'express';




import dotenv from 'dotenv';

dotenv.config();
const cloudinaryConfig = async(req: Request , res: Response, next: () => void): Promise<void> => {

    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
      });
      next();
};

export { cloudinaryConfig };
