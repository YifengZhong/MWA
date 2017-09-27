var express = require('express');
var DbIns = require('../repository/dbIns')
var router = express.Router();
var multer = require('multer')
var util = require('util')
fs = require('fs-extra')
var upload = multer({limits: {fileSize: 2000000 },dest:'/uploads/'})


// var oneDoc = new DbIns(
//   { id:101,
//     address:"1000 N 4st FairField IA",
//     img:"",
//     map:{latitude:90,longitude:48},
//     status:"available",
//     pricePerSq:124,
//     type:"Single Family Home",
//     built:"2017",
//     syle:"1 Story",
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
//     bathRooms:2,
//     diningRoom:[{width:15,length:16}],
//     livingRoom:[{width:20,length:18},{width:24,length:30}],
//     exterior:"Lot Square Footage: 62291.00",
//     garage:{type:1,features:"Electric, Extra Storage",length:24,width:24},
//     heatingandCooling:{fuelType:"Natural Gas",coolingFeature:"Central"},
//     utilities:{waterType:"city",sewerType:"city",waterHeater:"Gas"},
//     otherDescription:"Beautifully maintained property in Suburban Heights subdivision."

//   });

//   oneDoc.save(function(err){
//     if(err) throw err;
//     console.log('user Saved');
//   });
  // oneDoc.save(function(err){
  //   if(err) throw err;
  //   console.log('user Saved');
  // });


  //  DbIns.update({}, {id:5,address:"yes"},{multi:true},function (err, user) {
  //             if (err) return handleError(err);
  //             console.log(user);
  //         });
  // DbIns.find({status:"available"},function(err,users) {
  //   console.log(users);
  // });/* GET home page. */
router.post("/update",function(req,res,next){
  var obj = req.body;
  var keys = Object.keys(obj);
  var query={};
  var id = req.body.id;
  for (var i = 0; i < keys.length; i++) {
    query[keys[i]]=obj[keys[i]];
  }
  DbIns.update({id:id}, query,{multi:true},function (err, user) {
                if (err) return handleError(err);
                console.log(user);
            });
  console.log(sql);
  
})
router.get('/', function(req, res, next) {
  DbIns.find({},function(err,users) {
    console.log(users);
    res.render('index', { title: users });
  }).sort({id:1});
});
router.post('/uploadpicture',upload.single('imgfile'), function(req,res,next){
  if (req.file == null) {
    console.log("there is no file");
  } else {
      // read the img file from tmp in-memory location
      var newImg = fs.readFileSync(req.file.path);
      // encode the file as a base64 string.
      var encImg = newImg.toString('base64');
      DbIns.update({id:req.body.id}, {$push:{img:encImg}},function (err, user) {
                if (err) return handleError(err);
                console.log("Success");
                res.end();
            });    
  }
});
router.post('/search', function(req, res, next) {

  let keyValue = ".*"+req.body.keyArea+".*";
  let built = req.body.built;
    DbIns.find({$and:[{built:built},{address:{$regex:keyValue}}]},function(err,users) {
    res.end();
  }).sort({id:1});
});


router.post('/add',function(req,res,next) {
  let oneDoc = createDoc(req);
  oneDoc.save(function(err){
    if(err) throw err;
    console.log('user Saved');
  });
})

router.post('/remove',function(req,res,next) {
  let id = req.body.id;

  DbIns.remove({id:id},function(err){
    if(err) throw err;
    console.log('user removed');
    res.end();
  });
})

function createDoc(req) {
  return new DbIns(
    {
      id:req.body.id,
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
      otherDescription:req.body.otherDescription
    }); 
}
module.exports = router;
