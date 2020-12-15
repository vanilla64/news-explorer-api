const Article = require('../models/article');

const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

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

    const withoutOwnerArticle = await Article.findById({ _id: newArticle._id });
    res.send(withoutOwnerArticle);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteArticle = async (req, res, next) => {
  const { articleId } = req.params;
  try {
    const deletedArticle = await Article.findById({ _id: articleId }).populate('owner');

    if (!deletedArticle) {
      throw new NotFoundError(notFoundArticleMsg);
    }

    if (deletedArticle.owner._id.toString() === req.user._id) {
      deletedArticle.remove();
      res.send(articleIsDeleteMsg);
      return;
    }

    throw new ForbiddenError(notDeleteNotHimselfArticleMsg);
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
    const articles = await Article.find({ owner: req.user._id });

    if (articles.length === 0) {
      throw new NotFoundError(noSavedArticlesMsg);
    }

    res.send(articles);
  } catch (err) {
    next(err);
  }
};
