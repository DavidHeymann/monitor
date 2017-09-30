var express = require('express')
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
    
});

module.exports = router;
