//import the library
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//connect to a MongoDB database
mongoose.connect('mongodb://root:root@ds149324.mlab.com:49324/realestate_mwa');

var mySchema = new mongoose.Schema({
    _id:Number,
    address:String,
    img:[String],
    map:{latitude:Number,longitude:Number},
    status:String,
    pricePerSq:Number,
    type:String,
    built:Number,
    style:String,
    bedRooms:Array,
    kitchen:{num:Number,
             cabinets:Boolean,
             dishWasher:Boolean,
             Disposal:Boolean,
             microwave:Boolean,
             gas:Boolean,
             refrigerator:Boolean,
             ventFan:Boolean},
    bathRooms:Number,
    diningRoom:[{width:Number,length:Number}], 
    livingRoom:[{width:Number,length:Number}], 
    exterior:String,
    garage:{type:Boolean,features:String,length:Number,width:Number},
    heatingandCooling:{fuelType:String,coolingFeature:String},
    utilities:{waterType:String,sewerType:String,waterHeater:String},
    otherDescription:String,
    sqft:Number,
    sqftlot:Number
});
var DbIns = mongoose.model('realstate', mySchema);

module.exports=DbIns;
