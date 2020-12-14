require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const { errors } = require('celebrate');
const { PORT } = require('./utils/constants');
const { rateLimiter } = require('./middlewares/rateLimiter');
const { dbUrl, mongooseOptions } = require('./utils/mongoConfig');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { centralizedError } = require('./errors/centralizedError');

const app = express();

const router = require('./routes/router');

mongoose.connect(dbUrl, mongooseOptions);

app.use(helmet());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(rateLimiter);

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(centralizedError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
