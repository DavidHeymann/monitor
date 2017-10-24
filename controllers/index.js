var monitoringRouter = require('./monitoring.js'),
    serverRouter = require('./server.js'),
    samplingRouter = require('./sampling.js');

module.exports = (app) => {
    app.use('/monitoring', monitoringRouter);
    app.use('/server', serverRouter);
    app.use('/sampling', samplingRouter);
    app.get('/', function(req,res){
        console.log('In Index')
        //res.send("it's work")
        
        res.redirect('monitoring/');
    })
}