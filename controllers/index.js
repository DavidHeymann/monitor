var monitoringRouter = require('./monitoring.js');

module.exports = (app) => {
    app.use('/monitoring', monitoringRouter);
<<<<<<< HEAD
    app.get('/', (req,res)=>{
        console.log('Pass in index');
=======
    app.get('/', function(req,res){
        console.log('In Index')
        //res.send("it's work")
>>>>>>> c31bf2fff89abb93063a7959bf4085cd60d9782c
        res.redirect('monitoring/');
    })
}