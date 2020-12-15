const rateLimit = require('express-rate-limit');
const TooManyRequestsError = require('../errors/TooManyRequestsError');
const { tooManyRequestsMsg } = require('../utils/constants');

module.exports.rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req, res, next) => {
    try {
      throw new TooManyRequestsError(tooManyRequestsMsg);
    } catch (err) {
      next(err);
    }
  },
});
