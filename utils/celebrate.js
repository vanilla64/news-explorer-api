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
module.exports.getArticlesValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string()
      .pattern(/^Bearer.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
      .required(),
  })
    .unknown(true),
});

module.exports.createArticlesValidator = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().pattern(new RegExp(linkRegexp)),
    image: Joi.string().required().pattern(new RegExp(linkRegexp)),
  }),
});

module.exports.articleIdValidator = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().min(24).max(24).hex(),
  }),
});

// users
module.exports.getUserValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string()
      .pattern(/^Bearer.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
      .required(),
  })
    .unknown(true),
});
