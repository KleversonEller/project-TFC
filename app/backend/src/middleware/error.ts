import { ErrorRequestHandler } from 'express';

const middlewareError: ErrorRequestHandler = (err, _req, res, _next) => {
  const { name, message, details, code } = err;

  switch (name) {
    case 'validationError':
      res.status(code).json({ message: details[0].message });
      break;
    case 'personalError':
      res.status(code).json({ message });
      break;
    default:
      res.status(500).json({ message: 'Internal server error' });
      break;
  }
};

export default middlewareError;
