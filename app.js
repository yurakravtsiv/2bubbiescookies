var http=require('http');
var express=require('express');
var nodemailer = require("nodemailer");
var bodyParser = require('body-parser')
var path = require('path')
var port = Number(process.env.PORT || 4000);
var cookieParser = require('cookie-parser');
var cons = require('consolidate');

var home = require('./routes/home');
var about = require('./routes/about');
var corporate = require('./routes/corporate');
var order = require('./routes/order');
var portfolio = require('./routes/portfolio');
var testimonials = require('./routes/testimonials');

var app=express();

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '50mb'})); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));

app.use('/', home);
app.use('/about', about);
app.use('/corporate', corporate);
app.use('/order', order);
app.use('/portfolio', portfolio);
app.use('/testimonials', testimonials);

 
// sending mail function
app.post('/order/send', function(req, res, data){

// Sending Email Without SMTP

var fileString = req.body.file;
fileString = fileString.replace(/\s/g, '+')

if(req.body.fileName.toString() != 'undefined') {
  var transporter = nodemailer.createTransport();
  transporter.sendMail({
    from: "2bubbiescookies <2bubbiescookies.sender@gmail.com>", 
    to: "yuriy.kravtsiv@lasoft.org", 
    subject: "Order ✔", 
    html: "<b>First and Last name: </b>"+req.body.firstLastName+"<br>"
          +"<b>Phone number: </b>"+req.body.phoneNumber+"<br>"
          +"<b>Email: </b>"+req.body.email+"<br>"
          +"<b>Cookie Design: </b>"+req.body.cookieDesign+"<br>"
          +"<b>Quantity: </b>"+req.body.quantity+"<br>"
          +"<b>Message on sticker: </b>"+req.body.messageOnSticker+"<br>"
          +"<b>Order date: </b>"+req.body.orderDate+"<br>"
          +"<b>Date needed: </b>"+req.body.dateNeeded+"<br>"
          +"<b>Shipping Address: </b>"+req.body.shippingAddress+"<br>",
    attachments: [
         {   
            filename: req.body.fileName,
            content: fileString,
            encoding: 'base64'
         }
     ]
  });
}
else {
  var transporter = nodemailer.createTransport();
  transporter.sendMail({
    from: "2bubbiescookies <2bubbiescookies.sender@gmail.com>", 
    to: "yuriy.kravtsiv@lasoft.org", 
    subject: "Order ✔", 
    html: "<b>First and Last name: </b>"+req.body.firstLastName+"<br>"
          +"<b>Phone number: </b>"+req.body.phoneNumber+"<br>"
          +"<b>Email: </b>"+req.body.email+"<br>"
          +"<b>Cookie Design: </b>"+req.body.cookieDesign+"<br>"
          +"<b>Quantity: </b>"+req.body.quantity+"<br>"
          +"<b>Message on sticker: </b>"+req.body.messageOnSticker+"<br>"
          +"<b>Order date: </b>"+req.body.orderDate+"<br>"
          +"<b>Date needed: </b>"+req.body.dateNeeded+"<br>"
          +"<b>Shipping Address: </b>"+req.body.shippingAddress+"<br>"
  });
}

res.send("Email has been sent successfully");
 
   // Sending Emails with SMTP, Configuring SMTP settings
 
//     var smtpTransport = nodemailer.createTransport("SMTP",{
//              host: "smtp.gmail.com", // hostname
//     secureConnection: true, // use SSL
//     port: 465, // port for secure SMTP
//             auth: {
//                  user: "2bubbiescookies.sender@gmail.com",
//                  pass: "['2bubbiescookies']"
//             }
//         });
//         var mailOptions = {
//             from: "2bubbiescookies ✔ <2bubbiescookies.sender@gmail.com>", // sender address
//             to: "yura.kravtsiv@gmail.com", // list of receivers
//             subject: "Order ✔", // Subject line
//             //text: "Hello world ✔", // plaintext body
//             html: "<b>First and Last name: </b>"+req.body.firstLastName+"<br>"
//                  +"<b>Phone number: </b>"+req.body.phoneNumber+"<br>"
//                  +"<b>Email: </b>"+req.body.email+"<br>"
//                  +"<b>Cookie Design: </b>"+req.body.cookieDesign+"<br>"
//                  +"<b>Quantity: </b>"+req.body.quantity+"<br>"
//                  +"<b>Message on sticker: </b>"+req.body.messageOnSticker+"<br>"
//                  +"<b>Order date: </b>"+req.body.orderDate+"<br>"
//                  +"<b>Date needed: </b>"+req.body.dateNeeded+"<br>"
//                  +"<b>Shipping Address: </b>"+req.body.shippingAddress+"<br>"
//         }
//         smtpTransport.sendMail(mailOptions, function(error, response){
//         if(error){
//              res.send("Email could not sent due to error: "+error);
//         }else{
//              res.send("Email has been sent successfully");
//         } 
//     }); 
});
 
// Starting server
var server = http.createServer(app).listen(port, function() {
console.log("Listening on " + port);

});