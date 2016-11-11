var http=require('http');
var express=require('express');
var nodemailer = require("nodemailer");
var bodyParser = require('body-parser')
var app=express();
var path = require('path')
app.use(express.static(path.join(__dirname, 'public')));
var port = Number(process.env.PORT || 5000);
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));
 
// Home page
app.get('/',function(req,res){
    res.sendfile('index.html');
});
 
// sending mail function
app.post('/send', function(req, res){
// if(req.body.email == "" || req.body.subject == "") {
//   res.send("Error: Email & Subject should not blank");
//   return false;
// }
// Sending Email Without SMTP
nodemailer.mail({
    from: "2bubbiescookies ✔ <2bubbiescookies.sender@gmail.com>", // sender address
    to: "yuriy.kravtsiv@lasoft.org", // list of receivers
    subject: "Order ✔", // Subject line
    //text: "Hello world ✔", // plaintext body
    html: "<b>"+req.body.firstLastName+"</b>"+"<br>"
          +"<b>"+req.body.phoneNumber+"</b>"+"<br>"
          +"<b>"+req.body.email+"</b>"+"<br>"
          +"<b>"+req.body.cookieDesign+"</b>"+"<br>"
          +"<b>"+req.body.quantity+"</b>"+"<br>"
          +"<b>"+req.body.messageOnSticker+"</b>"+"<br>"
          +"<b>"+req.body.orderDate+"</b>"+"<br>"
          +"<b>"+req.body.dateNeeded+"</b>"+"<br>"
          +"<b>"+req.body.shippingAddress+"</b>"+"<br>"
    // ,attachments:[
    //   {
    //     streamSource: fs.createReadStream(req.files.file.path)
    //   }
    // ]
});
res.send("Email has been sent successfully");
 
   // Sending Emails with SMTP, Configuring SMTP settings
 
    // var smtpTransport = nodemailer.createTransport("SMTP",{
    //          host: "smtp.gmail.com", // hostname
    // secureConnection: true, // use SSL
    // port: 465, // port for secure SMTP
    //         auth: {
    //              user: "2bubbiescookies.sender@gmail.com",
    //              pass: "['2bubbiescookies']"
    //         }
    //     });
    //     var mailOptions = {
    //         from: "2bubbiescookies ✔ <2bubbiescookies.sender@gmail.com>", // sender address
    //         to: "yura.kravtsiv@gmail.com", // list of receivers
    //         subject: "Order ✔", // Subject line
    //         //text: "Hello world ✔", // plaintext body
    //         html: "<b>"+req.body.description+"</b>" // html body
    //     }
    //     smtpTransport.sendMail(mailOptions, function(error, response){
    //     if(error){
    //          res.send("Email could not sent due to error: "+error);
    //     }else{
    //          res.send("Email has been sent successfully");
    //     } 
    // }); 
});
 
// Starting server
var server = http.createServer(app).listen(port, function() {
console.log("Listening on " + port);
});