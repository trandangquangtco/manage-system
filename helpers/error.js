/* eslint-disable max-classes-per-file */
import httpStatus from 'http-status';

class ExtendableError extends Error {
  constructor({
    message, errors, status, isPublic, stack,
  }) {
    super(message);
    this.name = this.constructors.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.stack = stack;
    Error.captureStackTrace(this, this.constructors.name);
  }
}

class APIError extends ExtendableError {
  constructor({
    message,
    errors,
    stack,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
  }) {
    super({
      message,
      errors,
      status,
      isPublic,
      stack,
    });
  }
}

const errorHandle = (err, req, res, next) => {
  res.status(err.status || 400);
  res.json({
    status: err.status || 400,
    message: err.message,
  });
};

export { APIError, errorHandle };
