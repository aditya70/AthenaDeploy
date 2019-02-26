const express = require('express')
const app = express()
const port = 8000


app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'shezar@123',
        server: 'DESKTOP-PTAUQID', 
        database: 'ecatalog_dev' 
        // user: 'iic_aditya',
        // password: 'aditya@123',
        // server: "10.2.194.8\SQL2016", 
        // database: 'BOT' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
         request.query('select top(10) * from PartType', function (err, recordset) {
          //  request.query('select top(10) * from temp', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))