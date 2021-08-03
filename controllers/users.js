const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const AuthError = require('../errors/AuthError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const {
  JWT_DEV, emailExistMsg, validationErrorMsg, wrongPassOrEmailMsg,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

module.exports.createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const existedEmail = await User.findOne({ email });

    if (existedEmail) {
      throw new ConflictError(emailExistMsg);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ email, password: hashedPassword, name });
    res.send({ _id: newUser._id, email: newUser.email });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(validationErrorMsg));
      return;
    }

    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new AuthError(wrongPassOrEmailMsg);
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      throw new AuthError(wrongPassOrEmailMsg);
    }
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production'
        ? JWT_SECRET : JWT_DEV,
    );
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.send({
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    next(err);
  }
};
