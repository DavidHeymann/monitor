var express = require('express')
,controllers = require('./controllers') 
,app = express()
,mongoose = require('mongoose')
,port =  process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'))
app.set('view engine', 'ejs');
controllers(app);

mongoose.connect('mongodb://52.169.93.246/monitortest', { useMongoClient: true });


app.listen(port, function(){
    console.log('listening on port ' + port + '...')
});

module.exports = app; 