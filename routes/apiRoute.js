var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var chatHistoryController = require('./chatHistoryController');
var botResponseController = require('./botResponseController');
var conversationHistoryController = require('./conversationHistoryController');
var conversationController = require('./conversationController');
var sendChatToEmailController = require('./sendChatToEmailController')

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
 
    console.log('api route ');
    res.send('welcome to api route');
    
})


router.route('/conversationhistory')
.get(chatHistoryController.getConversationHistory)
.post(chatHistoryController.postConversationHistory);

router.route('/getbotresponse')
.get(botResponseController.getBotResponse);

router.route('/getconversationhistory')
.get(conversationHistoryController.getConversationHistory)
.post(conversationHistoryController.postConversationHistory);

router.route('/conversation')
.get(conversationController.getBotResponse);

router.route('/sendemail')
.get(sendChatToEmailController.sendConversationHistoryToEmail);

module.exports = router;
