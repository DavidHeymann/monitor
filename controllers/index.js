var monitoringRouter = require('./monitoring');

module.exports = (app) => {
    app.use('/monitoring', monitoringRouter);
    app.get('/', (req,res)=>{
        console.log('Pass in index');
        res.redirect('monitoring/');
    })
}