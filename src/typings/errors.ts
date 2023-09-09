/**
 * Error object options
 * type definition.
 * @type
 */
 export type ErrorObjectOptions = {
  name: string;
  code: ErrorCodes;
  statusCode: number;
  data?: Record<string, string | number | unknown>;
};

/**
 * Error object error codes
 * type definition.
 * @enum
 */
export enum ErrorCodes {
  BAD_USER_INPUT = 'BAD_USER_INPUT',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  FORBIDDEN = 'FORBIDDEN',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
}

/**
 * Error status codes type
 * definition.
 * @enum
 */
export enum ErrorStatusCodes {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  ServerError = 500
}
