var express = require('express')
,router = express.Router()
,sampling = require('../models/sampling')
,server = require('../models/server')
,mongoose = require('mongoose');

router.post('/create', async function(req ,res){
    idServer = await Types.ObjectId((server.getServerByIp(req.body.ipAdreess)).id)

    sampling.create(idServer, req.body.ram, req.body.cpu, (err, sampling)=>{
        if(err) return res.status(500).send(err.message);

        res.status(200).json(sampling);
    })
});

router.get('/all', (req,res)=>{
    sampling.getAll((err, samplings)=>{
        if(err) return res.status(500).send(err.message);
        
        res.status(200).json(samplings);
    })
});

router.get('/:ipServer', async (req, res)=>{
    idServer = await Types.ObjectId((server.getServerByIp(req.params.ipServer)).id)

    sampling.getSamplingsByIdServer(idServer, (err, samplings)=>{
        if(err) return res.status(500).send(err.message);
        
        res.status(200).json(samplings);
    })
});

router.get('/:ipServer', async (req, res)=>{
    idServer = await Types.ObjectId((server.getServerByIp(req.params.ipServer)).id)

    sampling.getSamplingsByIdServerAndTime(idServer, req.body.gtDate, req.body.ltDate, (err, samplings)=>{
        if(err) return res.status(500).send(err.message);
        
        res.status(200).json(samplings);
    })
});

router.delete('/:ipServer', (req, res)=>{
    idServer = await Types.ObjectId((server.getServerByIp(req.params.ipServer)).id)

    sampling.removeByIdServer(idServer, (err, samplings)=>{
        if(err) return res.status(500).send(err.message);
        
        res.status(200).json(samplings);
    })
})



module.exports= router;

