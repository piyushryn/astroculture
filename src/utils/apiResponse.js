export const successResponse = (
  res,
  data = null,
  message = "Success",
  statusCode = 200
) => {
  const response = {
    success: true,
    message,
    ...(data && { data }),
  };

  return res.status(statusCode).json(response);
};

export const errorResponse = (
  res,
  message = "Internal server error",
  statusCode = 500,
  error = null
) => {
  const response = {
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" &&
      error && { error: error.message || error }),
  };

  return res.status(statusCode).json(response);
};

export const validationErrorResponse = (
  res,
  message = "Validation failed",
  errors = null
) => {
  const response = {
    success: false,
    message,
    ...(errors && { errors }),
  };

  return res.status(400).json(response);
};

export const notFoundResponse = (res, message = "Resource not found") => {
  return errorResponse(res, message, 404);
};

export const unauthorizedResponse = (res, message = "Unauthorized") => {
  return errorResponse(res, message, 401);
};

export const forbiddenResponse = (res, message = "Forbidden") => {
  return errorResponse(res, message, 403);
};

export const conflictResponse = (res, message = "Resource conflict") => {
  return errorResponse(res, message, 409);
};
