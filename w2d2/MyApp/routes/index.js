var express = require('express');
var mongo = require('mongoskin');
var router = express.Router();

router.use((req,res,next) => {
  var db = mongo.db("mongodb://localhost:27017/homework8_3", {native_parse:true});
  req.db = db;
  db.collection("homework8_3").createIndex({Location: '2d'});
  next();
  db.close();
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {

  // req.db.collection("homework8_3").find({}, function(err,item){
  //   item.each(function(err,doc){
  //     console.dir(doc);
  //   });
  // });  
  console.log(req.body.longitude);
  console.log(req.body.latitude);
  const cur = req.db.collection("homework8_3")
                    .find({Location:{$near:[parseInt(req.body.longitude),parseInt(req.body.latitude)]}})
                    .limit(3);
  console.log(cur);
  cur.each(function(err,doc){
      // if(err) (console.log("ERR NULL"));
      // if(doc == null) (console.log("NULL NULL"));
      console.dir(doc);
  });
//  res.render('index', { title: 'Express' });
})

module.exports = router;
