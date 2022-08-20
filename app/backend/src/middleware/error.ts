import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const middlewareError: ErrorRequestHandler = (err, _req, res, _next) => {
  const { status, message } = err;
  console.log('LOOOOGGGG', message);

  if (!status) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }

  return res.status(status).json({ message });
};

export default middlewareError;
