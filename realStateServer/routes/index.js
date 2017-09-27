var express = require('express');
var DbIns = require('../repository/dbIns')
var observables = require('mongoose-observables');
var router = express.Router();
var multer = require('multer')
var util = require('util')
fs = require('fs-extra')
var mongoose = require('mongoose');
var upload = multer({limits: {fileSize: 2000000 },dest:'/uploads/'})


// var oneDoc = new DbIns(
//   { _id:4,
//     address:"2104 N 3st Chichago China",
//     img:undefined,
//     map:{latitude:90,longitude:48},
//     status:"available",
//     pricePerSq:345,
//     type:"Double Family Home",
//     built:"2007",
//     syle:"3 Story",
//     bedRooms:[{type:"master",length:11,width:22},
//               {type:"minor",length:12,width:10},
//               {type:"minor",length:12,width:10},
//               {type:"minor",length:11,width:11}],
//     kitchen:{
//              cabinets:true,
//              dishWasher:true,
//              Disposal:true,
//              microwave:true,
//              gas:true,
//              refrigerator:true,
//              ventFan:true},
//     bathRooms:3,
//     diningRoom:[{width:23,length:16}],
//     livingRoom:[{width:22,length:18},{width:25,length:30}],
//     exterior:"Lot Square Footage: 62291.00",
//     garage:{type:1,features:"Electric, Extra Storage",length:24,width:24},
//     heatingandCooling:{fuelType:"Natural Gas",coolingFeature:"Central"},
//     utilities:{waterType:"city",sewerType:"city",waterHeater:"Gas"},
//     otherDescription:"Beautifully maintained property in Suburban Heights subdivision.",
//     sqft:567,
//     sqftlot:3332
//   });

//   oneDoc.save(function(err){
//     if(err) throw err;
//     console.log('user Saved');
//   });
  // oneDoc.save(function(err){
  //   if(err) throw err;
  //   console.log('user Saved');
  // });


  //  DbIns.update({}, {_id:5,address:"yes"},{multi:true},function (err, user) {
  //             if (err) return handleError(err);
  //             console.log(user);
  //         });
  // DbIns.find({status:"available"},function(err,users) {
  //   console.log(users);
  // });/* GET home page. */

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
      savePic(req,res);
  }
});
function savePic(req,res) {
      // read the img file from tmp in-memory location
      let newImg = fs.readFileSync(req.file.path);
      // encode the file as a base64 string.
      let encImg = newImg.toString('base64');
      DbIns.update({_id:req.body._id}, {$push:{img:encImg}},function (err, user) {
                if (err) console.log("Upload file failed");
                else console.log("Success");
                res.end();
            });    
}
/*  
 * search: search items under certain condition
 * promise used
 */  
router.post('/search', function(req, res, next) {

  var obj = req.body;
  var keys = Object.keys(obj);
  var query={};
  var _id = req.body._id;

  for (var i = 0; i < keys.length; i++) {
    query[keys[i]]=obj[keys[i]];
  }
  console.log(query);
  var promise = DbIns.find({$and:[query]}).exec();
  promise.then(function(properties){
    console.log(Object.keys(properties).length);
    res.end(properties);
  })
});

/*  
 * search: search items by keywords in otherDescription and address fileds
 */  
router.post('/searchKeyWord', function(req, res, next) {
  
    let keyValue = ".*"+req.body.keyArea+".*";
    DbIns.find({$or:[{otherDescription:{$regex:keyValue}},{address:{$regex:keyValue}}]},function(err,users) {
      res.end(users);
    }).sort({_id:1});
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
  var oneDoc = createDoc(req);
  var promise = oneDoc.save();
  promise.then(function(result){
    console.log('user Saved');
    savePic(req,res);
  });
})


function createDoc(req) {
  console.log(req.body._id);
  return new DbIns(
    {
      _id:req.body._id,
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
}
module.exports = router;
