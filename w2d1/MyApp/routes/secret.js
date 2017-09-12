var express = require('express');
var mongo = require('mongoskin');
// var db = mongo.db("mongodb://localhost:27017/local", {native_parse:true});
// db.bind('homework7');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();
const crypto = require('crypto');
const decipher = crypto.createDecipher('aes256', 'asaadsaad');
var getMessage = function(res) {
    return MongoClient.connect('mongodb://127.0.0.1:27017/local', function(err, db){
        if(err) throw err;
        db.collection('homework7').findOne({} ,function(err,doc){
            if(err) throw err;
            let decrypted = decipher.update(doc.message, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            res.render('index', { title: decrypted });          
            db.close();
            
        })
      });
}


/* GET home page. */
router.get('/', function(req, res, next) {
  getMessage(res);  
  //res.render('index', { title: 'Express' });
});

module.exports = router;
