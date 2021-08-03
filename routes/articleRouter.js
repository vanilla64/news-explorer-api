const articleRouter = require('express').Router();

const { createArticlesValidator, deleteArticleIdValidator } = require('../utils/celebrate');
const { createArticle, deleteArticle, getArticles } = require('../controllers/articles');

articleRouter.get('/articles', getArticles);
articleRouter.post('/articles', createArticlesValidator, createArticle);
articleRouter.delete('/articles/:articleId', deleteArticleIdValidator, deleteArticle);

module.exports = articleRouter;
