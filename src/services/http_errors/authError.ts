import { BaseError } from './baseError';
import { ErrorCodes, ErrorStatusCodes } from '../../typings';

/**
 * Authentication error object for handling
 * authentication based errors
 * @class
 * @extends {BaseError}
 */
export class AuthenticationError extends BaseError {
  constructor(
    message: string,
    data?: Record<string, string | number | unknown>
  ) {
    super(message, {
      name: message,
      code: ErrorCodes.UNAUTHENTICATED,
      statusCode: ErrorStatusCodes.Unauthorized,
      data
    });
  }
}
