const { NODE_ENV, DB_URL } = process.env;

module.exports.dbUrl = NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/news-explorer-db';

module.exports.mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
