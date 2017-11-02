var express = require('express')
,router = express.Router()
,server = require('../models/server');


router.post('/create', function(req ,res){

    server.create(req.body.hostName, 
                  req.body.ipAdreess, 
                  req.body.userName, 
                  function(err, server){
                      if(err)  res.status(500).send(err.message);
                              
                      res.status(200).type('json').send(server);
                  })      
});

router.get('/all', function(req,res){
    server.getAll(function(err, servers){
        if(err)  res.status(500).send(err.message);
        
        res.status(200).type('json').send(servers);
    })
});

router.get('/:ipServer', function(req, res){
    server.getServerByIp(req.params.ipServer, (err, server)=>{
        if(err)  res.status(500).send(err.message);
        
        res.status(200).json(servers);
    })
});

router.put('/:ipServer', (req, res)=>{
    server.update(req.params.ipServer, req.body.ipAdreess, req.body.userName, (err, server)=>{
        if(err)  res.status(500).send(err.message);
        
        res.status(200).json(server);
    })
})

router.delete('/:ipServer', (req, res)=>{
    server.remove(req.params.ipServer, (err, server)=>{
        if(err)  res.status(500).send(err.message);
        
        res.status(200).json(server);
    })
})



module.exports= router;