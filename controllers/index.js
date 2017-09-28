var monitoringRouter = require('./monitoring');

module.exports = (app) => {
    app.use('/monitoring', monitoringRouter);
    app.get('/', (req,res)=>{
        res.redirect('monitoring/');
    })
}