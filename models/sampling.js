var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var samplingSchema = new Schema({
  idServer:  [{type: Schema.Types.ObjectId, ref: 'server'}],
  ram: String,
  cpu:  String,
  date: {type: Date, default: Date.now}
});

var Sampling = mongoose.model('Sampling', samplingSchema);

module.exports = Sampling;