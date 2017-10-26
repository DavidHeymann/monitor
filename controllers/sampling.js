var express = require('express')
,router = express.Router()
,sampling = require('../models/sampling')
,server = require('../models/server')
,mongoose = require('mongoose');

router.post('/create', async function(req ,res){
    var newSampling =  new sampling({
        idServer:  await server.findOne({'ipAdreess': req.body.ipAdreess},(err, server)=>{
            if(err) return console.error(err);
           
            return mongoose.Types.ObjectId(server.id);
        }),
        ram: req.body.ram,
        cpu: req.body.cpu
    })

    newSampling.save(function(err){
        if(err) throw err;

        res.send('The sampling saved')
    });
    
});

router.get('/listSampling', function(req,res){
    sampling.find(function(err, sampling){
        if(err) return console.error(err);

        res.send(sampling);
    });
});

router.post('/getSamplingsByIpServer', async function(req, res){
    idServer =  await server.findOne({'ipAdreess': req.body.ipAdreess},(err, server)=>{
        if(err) return console.error(err);

        return mongoose.Types.ObjectId(server.id);
    })
    sampling.find({'idServer': idServer},(err, sampling)=>{
        if(err) return console.error(err);

        res.send(sampling);
    });
});


module.exports= router;

