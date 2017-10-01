var express = require('express')
,controllers = require('./controllers') 
,app = express()
,port =  process.env.PORT || 3000;

controllers(app);

app.listen(port, function(){
    console.log('listening on port ' + port + '...')
});