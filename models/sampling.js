var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var samplingSchema = new Schema({
  id: String,
  idServer:  String,
  RAM: String,
  CPU:  String
});

var Sampling = mongoose.model('Sampling', samplingSchema);

module.exports = Sampling;