var express = require('express')
,controllers = require('./controllers') 
,app = express()
,mongoose = require('mongoose')
,bodyParser = require('body-parser')
,port =  process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'ejs');
controllers(app);

mongoose.connect('mongodb://52.169.93.246:27017/local', { useMongoClient: true });
mongoose.Promise = global.Promise;
var db =mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('we\'re connected!!');
})

app.listen(port, function(){
    console.log('listening on port ' + port + '...')
});

module.exports = app; 