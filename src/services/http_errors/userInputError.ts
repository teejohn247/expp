import { ErrorCodes, ErrorStatusCodes } from '../../typings';
import { BaseError } from './baseError';

/**
 * User Input Error object for handling
 * bad requests.
 * @class
 * @extends {BaseError}
 */
export class UserInputError extends BaseError {
  constructor(
    message: string,
    data?: Record<string, string | number | unknown>
  ) {
    super(message, {
      name: message,
      code: ErrorCodes.BAD_USER_INPUT,
      statusCode: ErrorStatusCodes.BadRequest,
      data

    });
  }
}
