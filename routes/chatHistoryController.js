var express  = require('express');
var app = express();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
const Joi = require('joi');
const schema = require('../model/chatHistoryModel');

app.use(expressValidator());
app.use(bodyParser.json());

module.exports.getConversationHistory = function(req , res){
 
   const userId = req.query.userId;
   const startDate = req.query.startDate;
   const endDate = req.query.endDate;

   console.log(userId+startDate+endDate);
 
   console.log('get conversation history controller');
  

 con.query("SELECT * FROM `chat_history` WHERE 1 and created_date between '2019-02-25' and '2019-02-26'", function (err, rows, fields) {
 
   if (err) throw err;
  res.send(JSON.stringify({ "status": 200, "error": null, "data": rows }));

  });

};

module.exports.postConversationHistory = function(req , res){

const result = Joi.validate(req.body, schema);

if(result.error)
{
//console.log(result.error);
res.status(400).send(result.error.details[0].message);
return ;
}

const chatHistory = req.body;
const userId = chatHistory.userId;
const startDate = chatHistory.startDate;
const endDate = chatHistory.endDate; 
con.query("SELECT * FROM `chat_history` WHERE employee_id = ? and created_date between ? and ?",[userId,startDate,endDate] ,function (err, rows, fields) {
 
  if (err) throw err;
 res.send(JSON.stringify({ "status": 200, "error": null, "data": rows }));

 });

};