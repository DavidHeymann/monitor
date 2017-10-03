var monitoringRouter = require('./monitoring.js');

module.exports = (app) => {
    app.use('/monitoring', monitoringRouter);
    app.get('/', function(req,res){
        console.log('In Index')
        //res.send("it's work")
        
        res.redirect('monitoring/');
    })
}