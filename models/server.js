var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serverSchema = new Schema({
  hostName: String,
  ipAdreess: String,
  userName:  String
});

var Server = mongoose.model('server', serverSchema );

module.exports = Server;