
var sql = require("mssql");

var config = {
     user: 'sa',
     password: 'shezar@123',
     server: 'DESKTOP-PTAUQID',
     database: 'Athena'
//    user: 'iic_aditya',
//    password: 'aditya@123',
//    server: "10.2.194.8\SQL2016", 
//    database: 'BOT' 
};

//connect to your database

sql.connect(config, function (err) {

    if (err) console.log(err);
    else{
        console.log("connected to ms sql database");
    }
});