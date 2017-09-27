var express = require('express');
var DbIns = require('../repository/dbIns')
var router = express.Router();


// var oneDoc = new DbIns(
//   { id:101,
//     address:"1000 N 4st FairField IA",
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

  // oneDoc.save(function(err){
  //   if(err) throw err;
  //   console.log('user Saved');
  // });
  // oneDoc.save(function(err){
  //   if(err) throw err;
  //   console.log('user Saved');
  // });


   DbIns.update({}, {pricePerSq:5},{multi:true},function (err, user) {
              if (err) return handleError(err);
              console.log(user);
          });
  // DbIns.find({status:"available"},function(err,users) {
  //   console.log(users);
  // });/* GET home page. */

router.get('/', function(req, res, next) {
  DbIns.find({},function(err,users) {
    console.log(users);
    res.render('index', { title: users });
  }).sort({id:1});
});

router.post('/search', function(req, res, next) {

  let keyValue = ".*"+req.body.keyArea+".*";
  let built = req.body.built;
    DbIns.find({$and:[{built:built},{address:{$regex:keyValue}}]},function(err,users) {
    res.end();
  }).sort({id:1});
});


router.post('/add',function(req,res,next) {
  console.log("asdfad");
  let oneDoc = createDoc(req);
  // var promise = oneDoc.save();
  // assert.ok(promise instanceof require('mpromise'));
  // promise.then(function(err){
  //     if(err) throw err;
  //     console.log('user Saved');
  //   });
  oneDoc.save(function(err){
    if(err) throw err;
    console.log('user Saved');
  });
})

router.post('/remove',function(req,res,next) {
  let id = req.body.id;
  console.log("remove...: "+id);
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
