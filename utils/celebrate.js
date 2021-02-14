const { celebrate, Joi } = require('celebrate');

const { linkRegexp } = require('./constants');

module.exports.registerValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }).unknown(true),
});

module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
});

// articles
module.exports.createArticlesValidator = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().pattern(new RegExp(linkRegexp)),
    // image: Joi.string().required().pattern(new RegExp(linkRegexp)),
    image: Joi.string(),
  }),
});

module.exports.deleteArticleIdValidator = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().min(24).max(24).hex(),
  }),
});
