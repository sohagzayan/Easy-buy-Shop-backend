const createError = require("http-errors");

/** Not Found  Route Handler */
exports.NotFindRouteHandaler = (rew, res, next) => {
  next(createError.NotFound("This Route does not exist"));
};

/** Global  Error Handler */
exports.globalErrorHandaler = (err, rew, res, next) => {
  res.status(200).json({
    status: 500,
    message: err,
  });
};
