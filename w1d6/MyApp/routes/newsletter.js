var express = require('express');
var session = require('express-session');
var router = express.Router();
var cookieParser = require('cookie-parser');
var fs = require('fs');
var csrf = require('csurf');
var bodyParser = require("body-parser")
var parseForm = bodyParser.urlencoded({ extended: false });

var read = function(email) {
  return new Promise(function(resolve,reject){
  console.log("in post1");  
  fs.appendFile('./file.txt',email,function(err) {
    if(err) reject("Failed to append");
    resolve(email);
  })
});
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});
router.post('/', function(request,res){
  request.assert('email', 'A valid email is required').notEmpty().isEmail();

  var errors  = request.validationErrors();
  if(errors) res.render('error',{errors:errors});
  else read(request.body.email)
      .then((email)=>{res.redirect('/thankyou/?email='+email)})
      .catch((e)=>{console.log(e);});

});
module.exports = router;
