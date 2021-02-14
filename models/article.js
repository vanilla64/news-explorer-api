const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const { linkRegexp, wrongUrlMsg } = require('../utils/constants');

const articleSchema = new Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url) => linkRegexp.test(url),
      message: (props) => `${props.value} ${wrongUrlMsg}`,
    },
  },
  image: {
    type: String,
    required: true,
    // validate: {
    //   validator: (url) => linkRegexp.test(url),
    //   message: (props) => `${props.value} ${wrongUrlMsg}`,
    // },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
}, { versionKey: false });

module.exports = model('article', articleSchema);
