const Article = require('../models/article');

const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');

const {
  articleIsDeleteMsg, noSavedArticlesMsg, notDeleteNotHimselfArticleMsg, notFoundArticleMsg,
} = require('../utils/constants');

module.exports.createArticle = async (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  try {
    const newArticle = await Article.create({
      keyword, title, text, date, source, link, image, owner: req.user._id,
    });

    const populateArticle = await Article.findById({ _id: newArticle._id }).populate('owner');
    res.send(populateArticle);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteArticle = async (req, res, next) => {
  const { articleId } = req.params;
  try {
    const deletedArticle = await Article.findById({ _id: articleId });

    if (!deletedArticle) {
      throw new NotFoundError(notFoundArticleMsg);
    }

    if (deletedArticle.owner.toString() === req.user._id) {
      await Article.findByIdAndRemove(articleId);
      res.send(articleIsDeleteMsg);
      return;
    }

    throw new AuthError(notDeleteNotHimselfArticleMsg);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new NotFoundError(notFoundArticleMsg));
      return;
    }

    next(err);
  }
};

module.exports.getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ owner: req.user._id }).populate('owner');

    if (articles.length === 0) {
      throw new NotFoundError(noSavedArticlesMsg);
    }

    res.send(articles);
  } catch (err) {
    next(err);
  }
};
