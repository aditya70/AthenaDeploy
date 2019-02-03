const express = require('express');
const app = express();
var request = require('request');



  
    //  var myJSONObject = {  };
    //   console.log("before request");
    //   request({
    //     url: "http://192.168.1.72/ecatalogueapi/api/ModelSearch/GetAllWithPagination",
    //     method: "POST",
    //     headers: {
    //         "content-type": "application/json",  // <--Very important!!!
    //     },
    //     body: myJSONObject
    // }, function (error, response, body){
    //     console.log(response);
        
    // });
    
    var jsonObj = { "pageIndex": 1,
    "itemsPerPage": 1}
    
    request.post(
        'http://192.168.1.72/ecatalogueapi/api/ModelSearch/GetAllWithPagination',
        { json: jsonObj},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        }
    );

//     request
//   .get('http://192.168.1.72/ecatalogueapi/api/ModelSearch/GetAll')
//   .on('response', function(response) {
//     console.log(response.statusCode) // 200
//     console.log(response.headers['content-type']) // 'image/png'

//   })

    const server = app.listen(process.env.PORT || 5000, () => {
        console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
      });
    