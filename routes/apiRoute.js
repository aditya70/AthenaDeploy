var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var chatHistoryController = require('./chatHistoryController');

// Add headers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({urlencoded : true})) //support x-www-form-urlencoded

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

router.use(bodyParser.json());

router.get('/' ,(req,res) =>{
   req.ass
    console.log('api route ');
    res.send('api route');
    
})


router.route('/getconversationhistory')
.get(chatHistoryController.getConversationHistory)
.post(chatHistoryController.postConversationHistory);

module.exports = router;