var express = require('express')
,controllers = require('./controllers') 
,app = express()
,port =  process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'))
app.set('view engine', 'ejs');
controllers(app);

app.listen(port, function(){
    console.log('listening on port ' + port + '...')
});

module.exports = app; 