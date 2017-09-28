var express = require('express')
,controllers = require('./controllers') 
,app = express()
,port =  process.env.PORT || 3000;

app.use(require('./controllers/'));
controllers(app);
app.listen(port, function(){
    console.log('listening on port ' + port + '...')
});