import cloudinary, { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

export function uploads(
	file: string,
	public_id?: string,
	overwrite?: boolean,
	invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
	return new Promise((resolve) => {
		cloudinary.v2.uploader.upload(
			file,
			{ public_id: public_id, overwrite, invalidate },
			(err: UploadApiErrorResponse | undefined, res: UploadApiResponse | undefined) => {
				if (err) resolve(err);
				resolve(res);
			}
		);
	});
}
