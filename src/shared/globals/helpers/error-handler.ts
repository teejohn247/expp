import HTTP_STATUS from 'http-status-codes';

export interface IErrorResponse {
	message: string;
	statusCode: number;
	status: string;
	serializedErrors(): IError;
}

export interface IError {
	message: string;
	statusCode: number;
	status: string;
}

export abstract class CustomError extends Error implements IErrorResponse {
	abstract statusCode: number;
	abstract status: string;

	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, CustomError.prototype);
	}

	serializedErrors(): IError {
		return {
			message: this.message,
			statusCode: this.statusCode,
			status: this.status
		};
	}
}

export class JoiRequestValidationError extends CustomError {
	statusCode = HTTP_STATUS.BAD_REQUEST;
	status = 'error';
	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, JoiRequestValidationError.prototype);
	}
}

export class BadRequestError extends CustomError {
	statusCode = HTTP_STATUS.BAD_REQUEST;
	status = 'error';

	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, BadRequestError.prototype);
	}
}

export class NotFoundError extends CustomError {
	statusCode = HTTP_STATUS.NOT_FOUND;
	status = 'error';

	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
}

export class NotAuthorizedError extends CustomError {
	statusCode = HTTP_STATUS.UNAUTHORIZED;
	status = 'error';

	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, NotAuthorizedError.prototype);
	}
}

export class InternalServerError extends CustomError {
	statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
	status = 'error';

	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, InternalServerError.prototype);
	}
}

export class FileTooLargeError extends CustomError {
	statusCode = HTTP_STATUS.REQUEST_TOO_LONG;
	status = 'error';

	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, FileTooLargeError.prototype);
	}
}
