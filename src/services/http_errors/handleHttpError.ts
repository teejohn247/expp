/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthenticationError } from './authError';
import { InternalServerError } from './internalServerError';
import { UserInputError } from './userInputError';

/**
 * Handles different custom http errors.
 * Function returns an internal server error
 * as default.
 * @function
 * @param error
 */
export function handleHttpError(error: any) {
  if (error instanceof UserInputError) throw error;
  if (error instanceof AuthenticationError) throw error;
  throw new InternalServerError('Something went wrong!');
}
