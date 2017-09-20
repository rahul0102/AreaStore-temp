const express=require('express');
const router=express.Router();
const Seller=require('../models/seller.js');

router.get('/',function(req,res,next){
  var lng=parseFloat(req.query.lng);
  var lat=parseFloat(req.query.lat);
  var maxD=parseInt(req.query.maxDistance);
  Seller.geoNear(
    {type:"Point",coordinates:[lng,lat]},
    {maxDistance:100000,spherical:true}
  ).then(function(sellers){
    console.log(sellers);
    res.send(sellers);
  }).catch(next);
  /*Seller.find({},function(err,sellers){
    if(err){
      return res.status(500).send("Error occure while finding sellers.");
    }
    else {
      res.status(200).send(sellers);
    }
  });*/
});
router.get('/:sellerId',function(req,res,next){
  var sellerId=req.params.sellerId;
  Seller.findOne({_id:sellerId}).then(function(err,seller){
    if(err) return next(err);
    res.send(seller);
  });
});

//adding new seller
router.post('/',function(req,res,next){
  //console.log(req.body);
  Seller.create(req.body).then(function (err,seller) {
    res.send(seller);
  }).catch(next);
});

//deleteing seller

router.delete('/:sellerId',function(req,res,next){
  var sellerID=req.params.sellerId;
  Seller.findByIDAndRemove({_id:sellerId}).then(function (err,seller) {
    if(err) return next(err);
    res.send({error:false,,message:"Successfully Deleted seller",sellerData:seller});
  });
});

//updateing seller
router.put('/:sellerId',function(req,res,next){
  var sellerID=req.params.sellerId;
  Seller.findByIDAndUpdate({_id:sellerId},req.body).then(function () {
    Seller.findOne({_id:sellerID}).then(function (err,seller) {
      if(err) return next(err);
      res.send({error:false,message:"Successfully Updated seller",sellerData:seller});
    });
  });
});
module.exports=router;
