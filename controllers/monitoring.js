var express = require('express')
<<<<<<< HEAD
    ,router = express.Router();

router.get('/', function(){
    console.log('Pass in monitor');
=======
    ,router = express.Router()
    ,nodeSsh = require('node-ssh');

router.get('/', (req,res) => {
    console.log('In Monitoring');
    var ssh = new nodeSsh();
    ssh.connect({
        host: '52.138.150.180',
        username: 'monitor',
        privatekey: '/home/david/.ssh/id_rsa'
    })
    .then(function(){
    /* ssh.execCommand(`echo $[100-$(vmstat 1 2|tail -1|awk '{print $15}')]`).then(function(result) {
        console.log('STDOUT: ' + result.stdout+'%')
        console.log('STDERR: ' + result.stderr)
        res.send('STDOUT: ' + result.stdout+'%')
      }) */
      ssh.execCommand("echo $[100-$(vmstat 1 2|tail -1|awk '{print $15}')]", { cwd:'/var/www' }).then(function(result) {
        console.log('STDOUT: ' + result.stdout)
        console.log('STDERR: ' + result.stderr)
      }, function(er){
            console.log('somthing error!!');
      })
    })
    
>>>>>>> c31bf2fff89abb93063a7959bf4085cd60d9782c
});

module.exports = router;
