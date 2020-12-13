const { serverErrMsg } = require('../utils/constants');

module.exports.centralizedError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  console.log(`ERROR: ${err.name}`);
  console.log(`ERROR: ${err.message}`);

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? serverErrMsg
        : message,
    });

  next();
};
