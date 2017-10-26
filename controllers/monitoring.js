var express = require('express')
    ,osUtils = require('os-utils')
    ,router = express.Router()
    ,exec = require('ssh-exec')
    ,sampling = require('../models/sampling')
    ,server = require('../models/server')
    ,mongoose = require('mongoose');

var intervalObjects ={};

router.get('/getCpu', (req, res)=>{
    catchCpuFromServer('monitor', '52.138.150.180').then(
        function(data){
            res.send(data);
        }
    )    
})

router.get('/getRam', (req, res)=>{
    catchRamFromServer('monitor', '52.138.150.180').then(
        function(data){
            res.send(data);
        }
    )    
})


router.get('/', (req, res)=>{
    Promise.all([catchCpuFromServer('monitor', '52.138.150.180'), 
        catchRamFromServer('monitor', '52.138.150.180')])
        .then(
            function(data){
                console.log('send')
                //res.send('cpu: '+res.locals.cpu+ ". ram: "+res.locals.ram)
                res.render('index', { CPU: data[0], RAM: data[1], SERVER_NAME: "monitor-server" });
            }
        )    
})

router.post('/infinteMonitoring', async (req,res, next)=>{
    intervalObjects[req.body.ipAdreess] =  setInterval(async ()=>{
        var data = await infinteMonitoring(req.body.ipAdreess)
        
        console.log('send')
        res.status(200);
        return res.render('index', { CPU: data.cpu, RAM: data.ram, SERVER_NAME: data.serverName });
          
    },10*1000 );

    
});

function catchCpuFromServer(username, ipAddress){
    return new Promise(function(resolve, reject){
        exec(/* "vmstat 1 2|tail -1|awk '{print 100-$15}'" */ "cat <(grep 'cpu ' /proc/stat) <(sleep 1 && grep 'cpu ' /proc/stat) | awk -v RS='' '{print ($13-$2+$15-$4)*100/($13-$2+$15-$4+$16-$5)}'", 
            username+'@'+ipAddress, function (err, stdout, stderr, req) {
                stdout = stdout.replace(/^\s+|\s+$/g, '');
                console.log('err: '+ err +', stdout: '+ stdout+', stderr: '+stderr)
                var result = stdout || "not cpu"
                resolve(result);
                //eject();
        })
    })
}

function catchRamFromServer(username, ipAddress){
    return new Promise(function(resolve, reject){
        exec(/* "free | grep Mem | awk '{print ($3+$6)*100/$2}'" */ "free | grep Mem | awk '{print ($2-$7)*100/$2}'", 
        username+'@'+ipAddress, function (err, stdout, stderr, req) {
            stdout = stdout.replace(/^\s+|\s+$/g, '');
            console.log('err: '+ err +', stdout: '+ stdout+', stderr: '+stderr)
            var result = stdout || "not ram";
            resolve(result);
            //reject()
        })
    }) 
}

async function infinteMonitoring(ipAdreess){
    currentServer = await server.findOne({'ipAdreess': ipAdreess},(err, server)=>{
        if(err) return console.error(err);
       
        return server;
    })

    var data = Promise.all([catchCpuFromServer(currentServer.userName, currentServer.ipAdreess), 
    catchRamFromServer(currentServer.userName, currentServer.ipAdreess)])
    .then(
        function(data){
            
            var newSampling =  new sampling({
                idServer:  mongoose.Types.ObjectId(currentServer.id),
                ram: data[1],
                cpu: data[0]
            })

            newSampling.save(function(err){
                if(err) throw err;

                console.log("save in db");
            });

            
            //res.send('cpu: '+res.locals.cpu+ ". ram: "+res.locals.ram)
            return {ram:data[1], cpu: data[0], serverName: currentServer.hostName}
        }
    )

    return data
}


module.exports = router;
