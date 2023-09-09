import { Request, Response} from 'express';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require('cloudinary').v2;

async function handleUpload(file: string) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: 'auto',
  });
  return res;
}
const imageUploader = async (req: Request , res: Response, next: () => void) => {
  try {
       console.log(req.file);
		if(req.file !== undefined){
			const b64 = Buffer.from(req.file.buffer).toString('base64');
			const dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
			const cldRes = await handleUpload(dataURI);
			req.body.image = cldRes.secure_url;
			console.log('kdk');
			next();
		}
    // res.json(cldRes);
  } catch (error) {
    res.send({
      message: error,
    });
  }
};

export default imageUploader;
