var express = require('express')
    ,router = express.Router();

router.get('/', (req,res) => {
    console.log('In Monitoring');
    res.send("It's Working!!!!:-)");
});

module.exports = router;
