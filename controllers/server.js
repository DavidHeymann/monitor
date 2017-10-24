var express = require('express')
,router = express.Router()
,server = require('../models/server');


router.post('/create', function(req ,res){
    var newServer = new server({
        hostName: req.body.hostName,
        ipAdreess: req.body.ipAdreess,
        userName:  req.body.userName
    })

    newServer.save(function(err){
        if(err) throw err;

        res.send('The server save')
    });
    
});

router.get('/listServers', function(req,res){
    server.find(function(err, servers){
        if(err) return console.error(err);

        res.send(servers);
    });
});

router.post('/getServerByIp', function(req, res){
    server.findOne({'ipAdreess': req.body.ipAdreess},(err, server)=>{
        if(err) return console.error(err);

        res.send(server);
    });
});


module.exports= router;