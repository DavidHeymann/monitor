var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var samplingSchema = new Schema({
  idServer:  [{type: Schema.Types.ObjectId, ref: 'server'}],
  ram: String,
  cpu:  String,
  date: {type: Date, default: Date.now}
});

var Sampling = mongoose.model('Sampling', samplingSchema);

var create = function(idServer, ram, cpu, callback){
    var newSampling =  new Sampling({
        'idServer':  idServer,
        'ram': ram,
        'cpu': cpu
    })

    return newSampling.save(callback)   
};

var getAll = function(callback){
    return Sampling.find(callback);
};



var getSamplingsByIdServer = function(idServer, callback){

    return Sampling.find({'idServer': idServer}, callback);
};

var getSamplingsByIdServerAndTime = function(idServer, gtDate, ltDate, callback){
    
        return Sampling.find({'idServer':idServer, date: {"$gte": gtDate, "$lte": ltDate}}, callback);
};

var removeByIdServer = function(idServer, callback){
    return Sampling.remove({'idServer': idServer}, callback);
}

module.exports = {
    create,
    getAll,
    getSamplingsByIdServer,
    getSamplingsByIdServerAndTime,
    removeByIdServer
}