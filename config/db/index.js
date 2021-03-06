var env = process.env.NODE_ENV || 'development';

var config = require('./conf')[env],
  Schema = require('jugglingdb').Schema,
  schema = new Schema('postgres', config);

module.exports = schema;
