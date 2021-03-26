// process.env.NODE_ENV ==='development' ? require('dotenv').config() : '';
const mongoose = require('mongoose');
// 'mongodb://localhost/book-search-engine'
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;
