import { ErrorObjectOptions } from '../../typings';

/**
 * Base error class object. Class extends
 * the javascript Error object
 * @class
 * @extends {Error}
 */
export class BaseError extends Error {
  code: string;

  statusCode: number;

  data: Record<string, string | number | unknown> | undefined;

  constructor(
    message: string,
    { name, code, statusCode, data }: ErrorObjectOptions
  ) {
    super(message);
    this.name = name;
    this.code = code;
    this.statusCode = statusCode;
    this.data = data;
    Error.captureStackTrace(this, BaseError);
  }
}
