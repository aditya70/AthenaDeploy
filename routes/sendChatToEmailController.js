var nodemailer = require('nodemailer');
const Joi = require('joi');
var fs = require('fs');
var stream = fs.createWriteStream("./chat_history.txt");
var sql = require('../config/msSqlUtil');
const schema = require('../model/emailModel');
/* GET users listing. */

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'adity@gmail.com',
        pass: 'XXXXXX'
    }
});



module.exports.sendConversationHistoryToEmail = function (req, res, next) {

    const result = Joi.validate(req.body, schema);

    if (result.error) {
        //console.log(result.error);
      return  res.status(400).send(result.error.details[0].message);
      
    }

    else{
        let emailBody = req.body ;
      // writeChatHistoryToFile(emailBody.userId , emailBody.startDate , emailBody.endDate);
      var data = [
        { "user_query": "hi", "bot_response": "Hi there, friend!", "created_date": "2019-02-21T09:32:46.000Z" },
        { "user_query": "hello", "bot_response": "Hi there, friend!", "created_date": "2019-02-21T09:33:02.000Z" },
        { "user_query": "hello athena", "bot_response": "Hello Sessionvariable.name, Tell me how can I help you? Please choose a sector of your choice: ^Farm^, ^Auto^, ^Other Biz^", "created_date": "2019-02-21T09:33:35.000Z" },
        { "user_query": "Auto", "bot_response": "In &$sector (Auto), what would you what to know? You can say ^Headcount^, ^Attrition^, etc", "created_date": "2019-02-21T09:48:03.000Z" },
        { "user_query": "Attrition", "bot_response": "attrition rate is 3 %", "created_date": "2019-02-21T09:48:12.000Z" }];
         
        console.log(data);

        for(let i=0; i< data.length; i++) {
            console.log("inside data");
            let created_date = data[i].created_date;
              created_date = created_date.replace('T', '  ');
              created_date = created_date.replace('.000Z', '');
              let user_query = data[i].user_query;
              let bot_response = data[i].bot_response;
              stream.write(`Date : ${created_date} \r\n`);
              stream.write(`You : ${user_query} \r\n`);
              stream.write(`Bot : ${bot_response} \r\n`);
          }
          
          stream.end();
          res.send("write to file");
          
        //   stream.once('open', function (fd) {
        //       console.log("inside stream");
        //     for (let i = 0; i < data.length; i++) {
        //       let created_date = data[i].created_date;
        //       created_date = created_date.replace('T', '  ');
        //       created_date = created_date.replace('.000Z', '');
        //       let user_query = data[i].user_query;
        //       let bot_response = data[i].bot_response;
        //       stream.write(`Date : ${created_date} \r\n`);
        //       stream.write(`You : ${user_query} \r\n`);
        //       stream.write(`Bot : ${bot_response} \r\n`);
             
        //     }
        
        //     console.log("successfully write data to chat history file");
        //     stream.end();
            
        //   });
     
        // var mailOptions = {
        //     from: 'adityagoyal252999@gmail.com',
        //     to: 'dilip@shezartech.in',
        //     subject: ' Password Verification',
        //     text: 'Your password is 1234 '
        // };
    
        // transporter.sendMail(mailOptions, function (err, info) {
        //     if (err) {
        //         console.log(err);
        //         res.send(JSON.stringify({ "status": 500, "error": err, "response": "Some error occured" }));
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //         res.send(JSON.stringify({ "status": 200, "error": null, "response": info.response }));
        //         // res.send(JSON.stringify({ "status": 200, "error": null, "response":"Your password is sent to  your registered Email address "+results[0].email+" Please check your email."}));
        //     }
    
        // });
       // res.send(JSON.stringify({ "status": 200, "error": null, "response": "Your password is sent to  your registered Email address , Please check your email." }));
    }
   
};

function writeChatHistoryToFile(userId , startDate , endDate)
{
    var data = [
        { "user_query": "hi", "bot_response": "Hi there, friend!", "created_date": "2019-02-21T09:32:46.000Z" },
        { "user_query": "hello", "bot_response": "Hi there, friend!", "created_date": "2019-02-21T09:33:02.000Z" },
        { "user_query": "hello athena", "bot_response": "Hello Sessionvariable.name, Tell me how can I help you? Please choose a sector of your choice: ^Farm^, ^Auto^, ^Other Biz^", "created_date": "2019-02-21T09:33:35.000Z" },
        { "user_query": "Auto", "bot_response": "In &$sector (Auto), what would you what to know? You can say ^Headcount^, ^Attrition^, etc", "created_date": "2019-02-21T09:48:03.000Z" },
        { "user_query": "Attrition", "bot_response": "attrition rate is 3 %", "created_date": "2019-02-21T09:48:12.000Z" }];

          stream.once('open', function (fd) {
            for (let i = 0; i < data.length; i++) {
              let created_date = data[i].created_date;
              created_date = created_date.replace('T', '  ');
              created_date = created_date.replace('.000Z', '');
              let user_query = data[i].user_query;
              let bot_response = data[i].bot_response;
              stream.write(`Date : ${created_date} \r\n`);
              stream.write(`You : ${user_query} \r\n`);
              stream.write(`Bot : ${bot_response} \r\n`);
             
            }
        
            console.log("successfully write data to chat history file");
            stream.end();
          });
}