import dotenv from 'dotenv';
import bunyan from 'bunyan';
import cloudinary from 'cloudinary';

dotenv.config({});

class Config {
	public DATABASE_URL: string | undefined;
	public JWT_TOKEN: string | undefined;
	public NODE_ENV: string | undefined;
	public PORT: number | undefined;
	public CLIENT_URL: string | undefined;
	public SECRET_KEY_ONE: string | undefined;
	public SECRET_KEY_TWO: string | undefined;
	public REDIS_HOST: string | undefined;
	public CLOUDNARY_NAME: string | undefined;
	public CLOUDNARY_API_KEY: string | undefined;
	public CLOUDNARY_API_SECRET: string | undefined;

	private readonly DEFAULT_DATABASE_URL: string = 'mongodb://localhost:27017/mopheth-backend';

	constructor() {
		this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
		this.JWT_TOKEN = process.env.JWT_TOKEN || '1234';
		this.NODE_ENV = process.env.NODE_ENV || 'development';
		this.PORT = Number(process.env.PORT) || 4000;
		this.CLIENT_URL = process.env.CLIENT_URL || '';
		this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
		this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
		this.REDIS_HOST = process.env.REDIS_HOST || '';
		this.CLOUDNARY_NAME = process.env.CLOUDNARY_NAME || '';
		this.CLOUDNARY_API_KEY = process.env.CLOUDNARY_API_KEY || '';
		this.CLOUDNARY_API_SECRET = process.env.CLOUDNARY_API_SECRET || '';
	}

	public createLogger(name: string): bunyan {
		return bunyan.createLogger({ name, level: 'debug' });
	}

	public validateConfig(): void {
		for (const key in this) {
			if (this[key as keyof Config] === undefined) {
				throw new Error(`Environment variable ${key} is missing`);
			}
		}
	}

	public cloudinaryConfig(): void {
		cloudinary.v2.config({
			cloud_name: this.CLOUDNARY_NAME,
			api_key: this.CLOUDNARY_API_KEY,
			api_secret: this.CLOUDNARY_API_SECRET
		});
	}

}

export const config = new Config();
