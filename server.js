const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var sql = require('./config/msSqlUtil');
//global.con = require('./config/mysqlUtil.js')
const apiRoute = require('./routes/apiRoute')

app.set('port', process.env.port || 3000);

app.use(cookieParser());
//app.use(logger('dev'));
app.use('/api', apiRoute);

app.get('/', (req, res) => res.send('welcome to express server'));

const server = app.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});



module.exports = app;