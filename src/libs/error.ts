/**
 * Thrown when a response is erroneous.
 */
export class ResponseError extends Error {
  info: string = '';
  status: number = 0;
}

/**
 * Defines an erroneous response.
 */
export interface ErrorResponse {
  message: string
}
