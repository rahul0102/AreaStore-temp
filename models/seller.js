const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Create a location schema
const LocationSchema=new Schema({
  type:{ //location type
    type:String,
    default:"Point"
  },
  coordinates:{
    type:[Number],
    index:"2dsphere"
  }
});

//create a Seller Schema & model

const sellerSchema = new Schema({

    shopname:{
      type:String,
      required:[true,"Can't leave seller name empty"]
    },
    homeDelivery:{
      available:{type:Boolean,default:false},
      minAmount:{type:Number}
    },
    onlinePayment:{
      available:{type:Boolean,default:false},
      partners:{type:[String]}
    },
    contactNo:{
      type:[String],
      required:true
    },
    joinedAt:{
      type:Date,
      required:true,
      default:Date.now
    },
    lastModiefiedAt:{
      type:Date,
      default:Date.now
    },
    shopLocation:LocationSchema,
    rating:{type:Number,default:0}
});

const Seller=mongoose.model('Seller',sellerSchema);
module.exports=Seller;
