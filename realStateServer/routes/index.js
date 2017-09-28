var express = require('express');
var DbIns = require('../repository/real');
var dbId = require('../repository/idSequence');
var observables = require('mongoose-observables');
var router = express.Router();
var multer = require('multer')
var util = require('util')
fs = require('fs-extra')
var mongoose = require('mongoose');
var upload = multer({limits: {fileSize: 2000000 },dest:'/uploads/'})


/*  
 * update: update the specific information for specified _id
 */  
router.post("/update",function(req,res,next){
  var obj = req.body;
  var keys = Object.keys(obj);
  var query={};
  var _id = req.body._id;
  for (var i = 0; i < keys.length; i++) {
    query[keys[i]]=obj[keys[i]];
  }
  DbIns.update({_id:_id}, query,{multi:true},function (err, user) {
                if (err) return handleError(err);
                res.end();
            });
})

/*  
 * get: get all the data from data base
 */  
router.get('/', function(req, res, next) {
  DbIns.find({},function(err,users) {
    console.log(users);
    res.render('index', { title: users });
  }).sort({_id:1});
});

/*  
 * post: upload the pictures in database for specified _id
 */  
router.post('/uploadpicture',upload.single('imgfile'), function(req,res,next){
  if (req.file == null) {
    console.log("there is no file");
  } else {
      savePic(req,res,req.body._id);
  }
});
function savePic(req,res,id) {
      // read the img file from tmp in-memory location
      let newImg = fs.readFileSync(req.file.path);
      // encode the file as a base64 string.
      let encImg = newImg.toString('base64');
      DbIns.update({_id:id}, {$push:{img:encImg}},function (err, user) {
                if (err) console.log("Upload file failed");
                else console.log("Image saved");
                res.end();
            });    
}
/*  
 * search: search items under certain condition
 * promise used
 */  
router.post('/search', function(req, res, next) {

  res.redirect('/search');
  // var obj = req.body;
  // var keys = Object.keys(obj);
  // var query={};
  // var _id = req.body._id;

  // for (var i = 0; i < keys.length; i++) {
  //   query[keys[i]]=obj[keys[i]];
  // }
  // console.log(query);
  // var promise = DbIns.find({$and:[query]}).exec();
  // promise.then(function(properties){
  //   console.log(Object.keys(properties).length);
  //   res.end(properties);
  // })
});

/*  
 * search: search items by keywords in otherDescription and address fileds
 */  
router.post('/searchKeyWord', function(req, res, next) {
    res.redirect('/searchKeyWord');
  //   let keyValue = ".*"+req.body.keyArea+".*";
  //   DbIns.find({$or:[{otherDescription:{$regex:keyValue}},{address:{$regex:keyValue}}]},function(err,users) {
  //     res.end(users);
  //   }).sort({_id:1});
  // }
});
  
/*  
 * add: remove a specified property by _id
 */  
router.post('/remove',function(req,res,next) {
  let _id = req.body._id;

  DbIns.remove({_id:_id},function(err){
    if(err) throw err;
    console.log('user removed');
    res.end();
  });
})

/*  
 * add: add a new property to database
 */  
router.post('/add',upload.single('imgfile'),function(req,res,next) {
  var oneDoc = createDoc(req,res,next);
})
function getValueForNextSequence(req,res,next){
  dbId.update({},{$inc:{sequence_value:1}},{multi:true},function (err, doc) {
    if (err) console.log("Update failed");
    else {
      dbId.findOne({},function(err,doc){
        var id = doc.sequence_value;
        let instance = new DbIns(
          {
            _id:doc.sequence_value,
            img:undefined,
            address:req.body.address,
            map:req.body.map,
            status:req.body.status,
            pricePerSq:req.body.pricePerSq,
            type:req.body.type,
            built:req.body.built,
            style:req.body.style,
            bedRooms:req.body.bedRooms,
            kitchen:req.body.kitchen,
            bathRooms:req.body.bathRooms,
            diningRoom:req.body.diningRoom,
            livingRoom:req.body.livingRoom,
            exterior:req.body.exterior,
            garage:req.body.garage,
            heatingandCooling:req.body.heatingandCooling,
            utilities:req.body.utilities,
            otherDescription:req.body.otherDescription,
            sqft:req.body.sqft,
            sqftlot:req.body.sqftlot
          }); 
          var promise = instance.save();
          promise.then(function(result){
            console.log('user Saved');
            savePic(req,res,id);
          });    
      });      
   }
 });
}

function createDoc(req,res,next) {
  getValueForNextSequence(req,res,next)
}
module.exports = router;
