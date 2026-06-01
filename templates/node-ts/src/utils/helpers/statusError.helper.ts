export class StatusError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  static badRequest(message = "Bad Request") {
    return new StatusError(message, 400);
  }

  static unauthorized(message = "Unauthorized") {
    return new StatusError(message, 401);
  }

  static forbidden(message = "Forbidden") {
    return new StatusError(message, 403);
  }

  static notFound(message = "Not Found") {
    return new StatusError(message, 404);
  }

  static internal(message = "Internal Server Error") {
    return new StatusError(message, 500);
  }
}
