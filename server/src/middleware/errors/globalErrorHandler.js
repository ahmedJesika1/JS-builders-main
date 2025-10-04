const globalErrorHandler = (err, req, res, next) => {
  console.error("Global Error:", err);

  if (!res || typeof res.status !== "function") {
    console.error("Invalid response object passed to globalErrorHandler");
    return next();
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: err.stack,
  });
};

module.exports = globalErrorHandler;
