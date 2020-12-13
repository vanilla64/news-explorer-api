const usersRouter = require('express').Router();

const { getUserValidator } = require('../utils/celebrate');
const { getUser } = require('../controllers/users');

usersRouter.get('/users/me', getUserValidator, getUser);

module.exports = usersRouter;
