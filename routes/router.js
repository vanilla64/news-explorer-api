const router = require('express').Router();
const usersRouter = require('./usersRouter');
const articleRouter = require('./articleRouter');

const { registerValidator, loginValidator } = require('../utils/celebrate');

const { createUser, login } = require('../controllers/users');
const { auth } = require('../middlewares/auth');

const NotFoundError = require('../errors/NotFoundError');
const { notFoundPageMsg } = require('../utils/constants');

router.post('/signup', registerValidator, createUser);
router.post('/signin', loginValidator, login);

router.use(auth);

router.use(usersRouter);
router.use(articleRouter);

router.use('*', () => {
  throw new NotFoundError(notFoundPageMsg);
});

module.exports = router;
