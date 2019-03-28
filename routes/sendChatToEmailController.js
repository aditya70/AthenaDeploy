var nodemailer = require('nodemailer');
/* GET users listing. */

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'adity@gmail.com',
        pass: 'XXXXXX'
    }
});



module.exports.sendConversationHistoryToEmail = function (req, res, next) {
  
    var mailOptions = {
                    from: 'adityagoyal252999@gmail.com',
                    to: 'dilip@shezartech.in',
                    subject: ' Password Verification',
                    text: 'Your password is 1234 '  
                };

                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                        res.send(JSON.stringify({ "status": 500, "error": err, "response": "Some error occured" }));
                    } else {
                        console.log('Email sent: ' + info.response);
                        res.send(JSON.stringify({ "status": 200, "error": null, "response": info.response }));
                      // res.send(JSON.stringify({ "status": 200, "error": null, "response":"Your password is sent to  your registered Email address "+results[0].email+" Please check your email."}));
                    }

                });
               res.send(JSON.stringify({ "status": 200, "error": null, "response":"Your password is sent to  your registered Email address , Please check your email."}));
};
