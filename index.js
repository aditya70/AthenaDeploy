'use strict';

require('dotenv').config()
const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;
//console.log(APIAI_TOKEN);
//console.log(APIAI_SESSION_ID);

const express = require('express');
const app = express();
var request = require('request');

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('a user connected');
});

const apiai = require('apiai')(APIAI_TOKEN);

// Web UI
app.get('/', (req, res) => {
  res.sendFile('newindex.html');
});

io.on('connection', function(socket) {
  socket.on('chat message', (text) => {
    console.log('Message: ' + text);

    // Get a reply from API.ai

    let apiaiReq = apiai.textRequest(text, {
      sessionId: APIAI_SESSION_ID
    });

    apiaiReq.on('response', (response) => {
      let aiText = response.result.fulfillment.speech;
      console.log('Bot reply: ' + aiText);

      // var jsonObj = { "pageIndex": 1,
      // "itemsPerPage": 1}
      
      // request.post(
      //     'http://192.168.1.72/ecatalogueapi/api/ModelSearch/GetAllWithPagination',
      //     { json: jsonObj},
      //     function (error, response, body) {
      //         if (!error && response.statusCode == 200) {
      //             console.log(body)
      //             socket.emit('bot reply', aiText);
      //             console.log("response success from post request")
      //         }
      //     }
      // );

     socket.emit('bot reply', aiText);
    //console.log("after request")
    });

    apiaiReq.on('error', (error) => {
      console.log(error);
    });

    apiaiReq.end();

  });
});
