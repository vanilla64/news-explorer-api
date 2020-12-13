const rateLimit = require('express-rate-limit');
const TooManyRequestsError = require('../errors/TooManyRequestsError');

module.exports.rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req, res, next) => {
    try {
      throw new TooManyRequestsError('Превышено количество запросов!');
    } catch (err) {
      next(err);
    }
  },
});
