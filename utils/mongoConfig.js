module.exports.dbUrl = 'mongodb://localhost:27017/news-explorer-db';

module.exports.mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
