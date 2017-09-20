
const express= require('express');
const bodyParser=require('body-parser');
//const routes=require('./routes/api');
const mongoose=require('mongoose');
const port = process.env.PORT || 4000;
const SellerController=require('./controllers/sellerController');


//setting express app
const app=express();

//connect to databse
mongoose.connect('mongodb://localhost/AreaStore');

//make mongoose global
mongoose.Promise=global.Promise;

//using bpdy-parser middleware
app.use(bodyParser.json());

//using SellerController
app.use('/sellers',SellerController);


//error handling middleware
app.use(function(err,req,res,next){
  //console.log(err);
  res.status(500).send({Error:err.message});
});


//listing request on port
//if using hiroku then use: process.env.port
app.listen(port,function(req,res){
  console.log("Listening at port"+app.get('port')+". . .");
});
