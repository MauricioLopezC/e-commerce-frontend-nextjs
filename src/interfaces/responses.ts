export interface ClassValidatorResponse {
  error: string;
  statusCode: 400;
  message: string[];
}

export interface UnauthorizedResponse {
  statusCode: 401;
  message?: string;
}

export interface HttpException {
  error?: string;
  statusCode: number;
  message: string | string[];
}
