const articleRouter = require('express').Router();

const { getArticlesValidator, createArticlesValidator, articleIdValidator } = require('../utils/celebrate');
const { createArticle, deleteArticle, getArticles } = require('../controllers/articles');

articleRouter.get('/articles', getArticlesValidator, getArticles);
articleRouter.post('/articles', createArticlesValidator, createArticle);
articleRouter.delete('/articles/:articleId', articleIdValidator, deleteArticle);

module.exports = articleRouter;
