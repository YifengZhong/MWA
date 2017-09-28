var mongoose = require('./dbIns');

// //import the library
// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// //connect to a MongoDB database
// mongoose.connect('mongodb://root:root@ds149324.mlab.com:49325/realestate_mwa');

// var idSchema = new mongoose.Schema(
// {
//   "_id" : String,
//   "sequence_value": Number
// });
var idSchema = new mongoose.Schema(
    {
      "_id" : String,
      "sequence_value": Number
    });
var DbId = mongoose.model('counters', idSchema);
module.exports=DbId;