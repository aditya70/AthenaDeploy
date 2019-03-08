'use strict';

require('dotenv').config()
const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;

const express = require('express');
const app = express();
const cors = require('cors');
var router = express.Router();
var sql = require('../config/msSqlUtil')
const apiai = require('apiai')(APIAI_TOKEN);
const mysql = require('mysql');
const requestModule = require('request');
var baseUrl = require('../config/baseUrl');
//enables cors

  module.exports.getBotResponse = function(req , res){

    if(!req.query.userId) return res.status(400).send("userId cannot be empty");
    if(!req.query.q) return res.status(400).send("user query q cannot be empty");
    const userId = req.query.userId;
    const text = req.query.q;

 
  let apiaiReq = apiai.textRequest(text, {
    sessionId: APIAI_SESSION_ID
  });

  apiaiReq.on('response', (response) => {
   let paramteresJson = response.result.parameters;
   console.log(paramteresJson);

   var Business_Unit = "",Sector = "",Division ="",Sub_division="",Department="",Sub_department="";
   if (typeof paramteresJson.Sector !== 'undefined' )
   {
      Sector = paramteresJson.Sector 
     console.log('sector: '+Sector)
   }

   if (typeof paramteresJson.Business_Unit !== 'undefined' )
   {
    Business_Unit = paramteresJson.Division 
     console.log('Division: '+Division)
   }


   if (typeof paramteresJson.Division !== 'undefined' )
   {
      Division = paramteresJson.Division 
     console.log('Division: '+Division)
   }

   if (typeof paramteresJson.Sub_division !== 'undefined' )
   {
      Sub_division = paramteresJson.Sub_division 
     console.log('Sub_division: '+Sub_division)
   }

   if (typeof paramteresJson.Department !== 'undefined' )
   {
      Department = paramteresJson.Department 
     console.log('Department:'+Department)
   }

   if (typeof paramteresJson.Sub_department !== 'undefined' )
   {
      Sub_department = paramteresJson.Sub_department 
     console.log('Sub_department: '+Sub_department)
   }
 

 let HD_MASK_ID = userId;

 var query = 'SELECT * FROM employee WHERE HD_MASK_ID = ' + mysql.escape(HD_MASK_ID);

  if (Sector !== "")
  {
    query = query + ' AND SA_Sector = '+ mysql.escape(Sector);
  }

  // if (Business_Unit !== "")
  // {
  //   sql = sql + ' AND SA_BU = '+ mysql.escape(Sector);
  // }

  // if (Division !== "")
  // {
  //   sql = sql + ' AND Division = '+ mysql.escape(Division);
  // }

  console.log(query);
  
  var aiText = ""

  // create Request object
  var request = new sql.Request();
  // query to the database
  request.query(query, function (err, recordset) {
    if (err) {
               console.log("Error while querying database :- " + err);
              return res.status(500).send(err);
              }
              else {
               // console.log( recordset.recordset);
                if (recordset.recordset.length > 0)
                    {
                  aiText = response.result.fulfillment.speech;
                  }
                  else
                  {
                  aiText = "you are not allowed to access this sector"
                  }
                   
                  request.input('HD_MASK_ID', sql.VarChar, HD_MASK_ID);
                  request.input('text', sql.VarChar, text);
                  request.input('aiText', sql.VarChar, aiText);
                  var chatHistorySql = "INSERT INTO chat_history (employee_id, user_query,bot_response) VALUES (@HD_MASK_ID,@text,@aiText)";
                  request.query(chatHistorySql,function (err, result) {
                  if (err) throw err;
                   console.log("chat history record inserted");
                 });
                 
                 if(!aiText.includes("****"))
                 {
                  res.status(200).send(aiText);
                 }
                  
                 else
                 {
                  requestModule.post(baseUrl, { json: response.result},

                function (error, responseDlModel, body) {
                if (!error && responseDlModel.statusCode == 200) {
                  console.log(body)
                  res.status(200).send(body);
              }
              else{
                res.status(500).send(JSON.stringify({"error": error, "response": null}))
              }
              
          }
      );
                 }
                }
        });

  });

  apiaiReq.on('error', (error) => {
    console.log(error);
  });

  apiaiReq.end();
  
};
 


