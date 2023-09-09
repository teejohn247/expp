import { ErrorCodes, ErrorStatusCodes } from '../../typings';
import { BaseError } from './baseError';

/**
 * Internal Server Error object for
 * handling server errors.
 * @class
 * @extends {BaseError}
 */
export class InternalServerError extends BaseError {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    message: any,
    data?: Record<string, string | number | unknown>
  ) {
    super(message, {
      name: 'Internal Server Error',
      code: ErrorCodes.INTERNAL_SERVER_ERROR,
      statusCode: ErrorStatusCodes.ServerError,
      data
    });
  }
}
