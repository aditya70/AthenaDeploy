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

module.exports.getBotResponse = function (req, res) {

  if (!req.query.userId) return res.status(400).send("userId cannot be empty");
  if (!req.query.q) return res.status(400).send("user query q cannot be empty");
  const userId = req.query.userId;
  const text = req.query.q;


  let apiaiReq = apiai.textRequest(text, {
    sessionId: APIAI_SESSION_ID
  });

  //   apiaiReq.on('response', (response) => {
  //    let paramteresJson = response.result.parameters;
  //    console.log(paramteresJson);

  //    var Business_Unit = "",Sector = "",Division ="",Sub_division="",Department="",Sub_department="";
  //    if (typeof paramteresJson.Sector !== 'undefined' )
  //    {
  //       Sector = paramteresJson.Sector 
  //      console.log('sector: '+Sector)
  //    }

  //    if (typeof paramteresJson.Business_Unit !== 'undefined' )
  //    {
  //     Business_Unit = paramteresJson.Division 
  //      console.log('Division: '+Division)
  //    }


  //    if (typeof paramteresJson.Division !== 'undefined' )
  //    {
  //       Division = paramteresJson.Division 
  //      console.log('Division: '+Division)
  //    }

  //    if (typeof paramteresJson.Sub_division !== 'undefined' )
  //    {
  //       Sub_division = paramteresJson.Sub_division 
  //      console.log('Sub_division: '+Sub_division)
  //    }

  //    if (typeof paramteresJson.Department !== 'undefined' )
  //    {
  //       Department = paramteresJson.Department 
  //      console.log('Department:'+Department)
  //    }

  //    if (typeof paramteresJson.Sub_department !== 'undefined' )
  //    {
  //       Sub_department = paramteresJson.Sub_department 
  //      console.log('Sub_department: '+Sub_department)
  //    }


  //  let HD_MASK_ID = userId;

  //  var query = 'SELECT * FROM employee WHERE HD_MASK_ID = ' + mysql.escape(HD_MASK_ID);

  //   if (Sector !== "")
  //   {
  //     query = query + ' AND SA_Sector = '+ mysql.escape(Sector);
  //   }

  //   // if (Business_Unit !== "")
  //   // {
  //   //   sql = sql + ' AND SA_BU = '+ mysql.escape(Sector);
  //   // }

  //   // if (Division !== "")
  //   // {
  //   //   sql = sql + ' AND Division = '+ mysql.escape(Division);
  //   // }

  //   console.log(query);

  //   var aiText = ""

  //   // create Request object
  //   var request = new sql.Request();
  //   // query to the database
  //   request.query(query, function (err, recordset) {
  //     if (err) {
  //                console.log("Error while querying database :- " + err);
  //               return res.status(500).send(err);
  //               }
  //               else {
  //                // console.log( recordset.recordset);
  //                 if (recordset.recordset.length > 0)
  //                     {
  //                   aiText = response.result.fulfillment.speech;
  //                   }
  //                   else
  //                   {
  //                   aiText = "you are not allowed to access this sector"
  //                   }

  //                   request.input('HD_MASK_ID', sql.VarChar, HD_MASK_ID);
  //                   request.input('text', sql.VarChar, text);
  //                   request.input('aiText', sql.VarChar, aiText);
  //                   var chatHistorySql = "INSERT INTO chat_history (employee_id, user_query,bot_response) VALUES (@HD_MASK_ID,@text,@aiText)";
  //                   request.query(chatHistorySql,function (err, result) {
  //                   if (err) throw err;
  //                    console.log("chat history record inserted");
  //                  });

  //                  if(!aiText.includes("****"))
  //                  {
  //                   res.status(200).send(aiText);
  //                  }

  //                  else
  //                  {
  //                   requestModule.post(baseUrl, { json: response.result},

  //                 function (error, responseDlModel, body) {
  //                 if (!error && responseDlModel.statusCode == 200) {
  //                   console.log(body)
  //                   res.status(200).send(body);
  //               }
  //               else{
  //                 res.status(500).send(JSON.stringify({"error": error, "response": null}))
  //               }

  //           }
  //       );
  //                  }
  //                 }
  //         });

  //   });

  apiaiReq.on('response', (response) => {

    let paramteresJson = response.result.parameters;

    let contextJson = response.result.contexts;
    if (typeof contextJson !== 'undefined' && contextJson) {
      let length = contextJson.length;

      if (length > 0) {
        if (typeof contextJson[length - 1].parameters !== 'undefined' && contextJson[length - 1].parameters) {
          paramteresJson = contextJson[length - 1].parameters;
        }
      }

    }

   // console.log(paramteresJson);

  let entity0 = "",
      entity1 = "",
      entity2 = "",
      entity3 = "",
      entity4 = "",
      entity5 = "",
      sector = "",
      businessUnit = "",
      division = "",
      subDivision = "",
      department = "",
      subDepartment = "",
      company = "",
      grade = "",
      level = "",
      year = "",
      domainType = "",
      gender = "",
      ageGroup = "",
      startDate = "",
      endDate = "",
      listSort = "",
      groupBy = "",
      tenureGroup = "",
      month = "",
      employeeGroup = "",
      spanOfControl = "",
      date = "",
      filter = "",
      typeDuration = "",
      operator = "",
      sysNumber = "",
      yoy = "",
      percentage = "",
      overallAFStransfer = "",
      difference = "",
      which = ""
      ;

    if (typeof paramteresJson !== 'undefined') {  
    //  if (typeof paramteresJson.age_group_kpi !== 'undefined') entity0 = paramteresJson.age_group_kpi;
      if (typeof paramteresJson.Org_structure_KPI !== 'undefined') entity1 = paramteresJson.Org_structure_KPI;
      if (typeof paramteresJson.org_structure_filter !== 'undefined') filter = paramteresJson.org_structure_filter;
      if (typeof paramteresJson.Sector !== 'undefined') sector = paramteresJson.Sector;
      if (typeof paramteresJson.Org_structure_KPI1 !== 'undefined') entity2 = paramteresJson.Org_structure_KPI1;
      if (typeof paramteresJson.Commonly_used_terms !== 'undefined') entity3 = paramteresJson.Commonly_used_terms;
      if (typeof paramteresJson.Org_structure_kpi_2 !== 'undefined') entity0 = paramteresJson.Org_structure_kpi_2;
     // if (typeof paramteresJson.seperation_kpi !== 'undefined') entity5 = paramteresJson.seperation_kpi;
      if (typeof paramteresJson.Sector !== 'undefined') sector = paramteresJson.Sector;
      if (typeof paramteresJson.business_unit !== 'undefined') businessUnit = paramteresJson.business_unit;
      if (typeof paramteresJson.Department !== 'undefined') department = paramteresJson.Department;
      if (typeof paramteresJson.Gender !== 'undefined') gender = paramteresJson.Gender;
      if (typeof paramteresJson.Group_by !== 'undefined') groupBy = paramteresJson.Group_by;
      if (typeof paramteresJson.Division !== 'undefined') division = paramteresJson.Division;
      if (typeof paramteresJson.employee_grade !== 'undefined') grade = paramteresJson.employee_grade;
      if (typeof paramteresJson.Subdivision !== 'undefined') subDivision = paramteresJson.Subdivision;
      if (typeof paramteresJson.which !== 'undefined') which = paramteresJson.which;
      if (typeof paramteresJson.greaterthan_lessthan !== 'undefined') operator = paramteresJson.greaterthan_lessthan;
      if (typeof paramteresJson.sys_number !== 'undefined') sysNumber = paramteresJson.sys_number;
      if (typeof paramteresJson.top_bottom !== 'undefined') entity4 = paramteresJson.top_bottom;
      if (typeof paramteresJson.percentage !== 'undefined') percentage = paramteresJson.percentage;
      if (typeof paramteresJson.overall_afs_avg !== 'undefined') overallAFStransfer = paramteresJson.overall_afs_avg;
      if (typeof paramteresJson.difference !== 'undefined') difference = paramteresJson.difference;
      if (typeof paramteresJson.yoy !== 'undefined') yoy = paramteresJson.yoy;

      if (typeof paramteresJson.date !== 'undefined' && paramteresJson.date !== '') {
          date = paramteresJson.date;
      }

      else {

        if (typeof paramteresJson["date-period"] !== "undefined") {
          date = paramteresJson["date-period"];
          if (typeof paramteresJson["date-period"].startDate !== 'undefinded' && typeof paramteresJson["date-period"].endDate !== 'undefinded')
          {
            startDate = paramteresJson["date-period"].startDate;
            endDate = paramteresJson["date-period"].endDate;
          }
        }

      }
    }

    if (entity1 === "")
     entity1 = entity0;

     if (filter && filter === "business_unit")
     {
      if (typeof paramteresJson.common_bu_div !== 'undefined' &&  paramteresJson.common_bu_div) businessUnit = paramteresJson.common_bu_div;
      if (typeof paramteresJson.common_sector_bu !== 'undefined' && paramteresJson.common_sector_bu) businessUnit = paramteresJson.common_sector_bu;
      if (typeof paramteresJson.common_bu_subdiv !== 'undefined' && paramteresJson.common_bu_subdiv) businessUnit = paramteresJson.common_bu_subdiv;
      if (typeof paramteresJson.common_bu_subdep_div_dept !== 'undefined' && paramteresJson.common_bu_subdep_div_dept) businessUnit = paramteresJson.common_bu_subdep_div_dept;
     }

     if (filter && filter === "division")
     {

      if (typeof paramteresJson.common_bu_div !== 'undefined' &&  paramteresJson.common_bu_div) division = paramteresJson.common_bu_div;
      if (typeof paramteresJson.common_bu_subdep_div_dept !== 'undefined' && paramteresJson.common_bu_subdep_div_dept) division = paramteresJson.common_bu_subdep_div_dept;


     }

     if (filter && filter === "sector")
     {
      if (typeof paramteresJson.common_sector_bu !== 'undefined' && paramteresJson.common_sector_bu) sector = paramteresJson.common_sector_bu;
      if (typeof paramteresJson.common_sector_dept !== 'undefined' && paramteresJson.common_sector_dept) sector = paramteresJson.common_sector_dept;
    //  if (typeof paramteresJson.common_sector_dept_subdivision !== 'undefined' && paramteresJson.common_sector_dept_subdivision) sector = paramteresJson.common_sector_dept_subdivision;
     
     }

    
     if (filter && filter === "sub_division")
     {
      if (typeof paramteresJson.common_bu_subdiv !== 'undefined' && paramteresJson.common_bu_subdiv) subDivision = paramteresJson.common_bu_subdiv;
      if (typeof paramteresJson.common_sector_dept !== 'undefined' && paramteresJson.common_sector_dept) subDivision = paramteresJson.common_sector_dept;
      if (typeof paramteresJson.common_subdiv-subdep  !== 'undefined' && paramteresJson.common_subdiv-subdep ) subDivision = paramteresJson.common_subdiv-subdep ;
    
    }

     if (filter && filter === "department")
     {
      if (typeof paramteresJson.common_sector_dept !== 'undefined' && paramteresJson.common_sector_dept) department = paramteresJson.common_sector_dept;
     // if (typeof paramteresJson.common_sector_dept_subdivision !== 'undefined' && paramteresJson.common_sector_dept_subdivision) department = paramteresJson.common_sector_dept_subdivision;
      if (typeof paramteresJson.common_bu_subdep_div_dept !== 'undefined' && paramteresJson.common_bu_subdep_div_dept) department = paramteresJson.common_bu_subdep_div_dept;
      
     }

     if (filter && filter === "sub_department")
     {
      if (typeof paramteresJson.common_bu_subdep_div_dept !== 'undefined' && paramteresJson.common_bu_subdep_div_dept) subDepartment = paramteresJson.common_bu_subdep_div_dept;
      if (typeof paramteresJson.common_subdiv-subdep  !== 'undefined' && paramteresJson.common_subdiv-subdep ) subDepartment = paramteresJson.common_subdiv-subdep ;
      
     }


   //console.log(paramteresJson);

    var json = {
      "question": text,
      "entity0" : entity0,
      "entity1" : entity1 ,
      "entity2" : entity2,
      "entity3" : entity3,
       "filter" : filter,
       "entity4" : entity4,
      // "entity5" : entity5,
      "sector": sector,
      "businessUnit": businessUnit,
      "division": division,
      "subDivision": subDivision,
      "department": "",
      "subDepartment": "",
      "company": "",
      "grade": grade,
      "level": "",
      "date": date,
      "domainType": "",
      "gender": gender,
      "ageGroup": "",
      "startDate": "",
      "endDate": "",
      "listSort": "",
      "groupBy": groupBy,
      "tenureGroup": tenureGroup,
      "month": month,
      "employeeGroup": employeeGroup,
      "spanOfControl": spanOfControl,
      "startDate" : startDate,
      "endDate" : endDate,
      "typeDuration" : typeDuration,
      "operator" : operator,
      "sysNumber" : sysNumber,
      "yoy" : yoy,
      "percentage" : percentage,
      "overallAFStransfer" : overallAFStransfer,
      "difference" : difference,
      "which" : which
    };

   //console.log("DL model request body is " +JSON.stringify(json, null, 4));

    let employeeId = userId;

    var query = 'SELECT * FROM employee WHERE Employee_Id = ' + mysql.escape(employeeId);

    if (sector !== "") {
      query = query + `AND SA_Sector like '%${sector}%' `;

    }

    if (businessUnit !== "") {
      query = query + `AND SA_BU like '%${businessUnit}%' `;
    }

    if (division !== "") {
      query = query + `AND SA_Division like '%${division}%' `;
    }

   //console.log(query);

    if (entity1 !== "" || businessUnit !== "" || sector !== "" || division != "") {
      // create Request object
      var request = new sql.Request();

      request.query(query, function (err, recordset) {

        if (err) {
          console.log("Error while querying database :- ");
          return res.status(500).send(JSON.stringify({ "statusCode": 500, "error": err, "response": null }));
        }

        else {

          if (recordset.recordset.length > 0) {

            var aiText = response.result.fulfillment.speech;

            if (!aiText.includes("****")) {
              insertRecord(employeeId, text, aiText);
              return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": aiText }));
            }

            else {

              requestModule.post("http://13.232.168.178:8000/customapi", { json: json },

                function (error, responseDlModel, body) {

                  if (!error && responseDlModel.statusCode == 200) {

                    var concatedAiText = "";
                    if (body.Text && body.Text == 1) {

                      concatedAiText = aiText.replace("****", body.TextContent);
                      insertRecord(employeeId, text, concatedAiText);
                      return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": concatedAiText }));
                    }
                    else {
                      return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": aiText, "responseBody": body }));
                    }
                  }
                  else {
                    return res.status(500).send(JSON.stringify({ "statusCode": 500, "error": error, "response": null }))
                  }

                });

            }
          }

          else {
            aiText = `According to the authentication list, you are not supposed to view the data for this particular dimension. 
                    Please try asking information on the other dimensions of Mahindra.`;

            insertRecord(employeeId, text, aiText);

            return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": aiText }));
          }

        }

      });

    }

    else {
      var aiText = response.result.fulfillment.speech;
      insertRecord(employeeId, text, aiText);
      return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": aiText }));
    }



  });

  apiaiReq.on('error', (error) => {
    console.log(error);
  });

  apiaiReq.end();

};

var insertRecord = function (employeeId, userText, aiText) {

  var request = new sql.Request();
  request.input('HD_MASK_ID', sql.VarChar, employeeId);
  request.input('text', sql.VarChar, userText);
  request.input('aiText', sql.VarChar, aiText);
  var chatHistorySql = "INSERT INTO chat_history (employee_id, user_query,bot_response) VALUES (@HD_MASK_ID,@text,@aiText)";
  request.query(chatHistorySql, function (err, result) {
    if (err) throw err;

    else {
      // console.log("chat history record inserted");
      return true;
    }

  });

}



