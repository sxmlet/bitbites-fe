export class ResponseError extends Error {
  info: string = '';
  status: number = 0;
}

export interface ErrorResponse {
  message: string
}
