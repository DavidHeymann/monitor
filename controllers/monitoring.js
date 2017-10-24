var express = require('express')
    ,osUtils = require('os-utils')
    ,router = express.Router()
    ,exec = require('ssh-exec');


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

function catchCpuFromServer(username, ipAddress){
    return new Promise(function(resolve, reject){
        exec(/* "vmstat 1 2|tail -1|awk '{print 100-$15}'" */ "cat <(grep 'cpu ' /proc/stat) <(sleep 1 && grep 'cpu ' /proc/stat) | awk -v RS='' '{print ($13-$2+$15-$4)*100/($13-$2+$15-$4+$16-$5)}'", 
            username+'@'+ipAddress, function (err, stdout, stderr, req) {
                stdout = stdout.replace(/^\s+|\s+$/g, '');
                console.log('err: '+ err +', stdout: '+ stdout+', stderr: '+stderr)
                var result = stdout || "not cpu"
                resolve(result);
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
        })
    }) 
}

module.exports = router;
