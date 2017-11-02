var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serverSchema = new Schema({
  hostName: {type: String, required: true},
  ipAdreess:{type: String, required: true},
  userName: {type: String, required: true},
});

var Server = mongoose.model('server', serverSchema );

var create = function(hostName, ipAdreess, userName, callback){
  var newServer = new Server({
      'hostName': hostName,
      'ipAdreess': ipAdreess,
      'userName':  userName
  })

  return newServer.save(callback) 
};

var getAll = function(callback){
  return Server.find(callback);
};

var getServerByIp = function(ipAdreess, callback){
  return Server.findOne({'ipAdreess': ipAdreess}, callback);
};

var update = function(currentIpAdreess, newIpAdreess, userName, callback){
  if (newIpAdreess == "") {
    return Server.update({'ipAdreess': currentIpAdreess}, {'userName': userName}, callback)
  } else if (userName == "") {
    return Server.update({'ipAdreess': currentIpAdreess}, {'ipAdreess': newIpAdreess}, callback)
  }

  return Server.update({'ipAdreess': currentIpAdreess}, {'userName': userName, 'ipAdreess': newIpAdreess}, callback)
}

var remove = function(ipAdreess, callback){
  return Server.remove({ 'ipAdreess': ipAdreess }, callback)
}

module.exports = {
  create,
  getAll,
  getServerByIp,
  update,
  remove
};