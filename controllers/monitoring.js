var express = require('express')
    ,router = express.Router()
    //,nodeSsh = require('node-ssh')
    ,exec = require('ssh-exec');


router.get('/', (req, res, next)=>{
    exec("vmstat 1 2|tail -1|awk '{print 100-$15}'", 
    'monitor@52.138.150.180', function (err, stdout, stderr, req) {
        stdout = stdout.replace(/^\s+|\s+$/g, '');
        console.log('err: '+ err +', stdout: '+ stdout+', stderr: '+stderr)
        res.locals.cpu = stdout || "not cpu";
        next()
    })
},(req ,res, next)=>{
    exec("free | grep Mem | awk '{print ($3+$6)*100/$2}'", 
    'monitor@52.138.150.180', function (err, stdout, stderr, req) {
        stdout = stdout.replace(/^\s+|\s+$/g, '');
        console.log('err: '+ err +', stdout: '+ stdout+', stderr: '+stderr)
        res.locals.ram = stdout || "not ram";
        next()
    })
},(req, res)=>{
    console.log('send')
    //res.send('cpu: '+res.locals.cpu+ ". ram: "+res.locals.ram)
    res.render('index', { CPU: res.locals.cpu, RAM: res.locals.ram, SERVER_NAME: "monitor-server" });
    
})


module.exports = router;
