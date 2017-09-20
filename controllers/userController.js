const express=require('express');
const router=express.Router();
const User=require('../models/user.js');
const passport=require('passport');
const local-strategy=require('passport-local').Strategy;
//login function
router.get('/login',function () {
  var userId
});

//Signup
router.post('/register',function (req,res,next) {
    var email=req.body.email;
    var password=req.body.password;

    User.getUserByEmail(email,function (err,user) {
      //if any error return error
      if(err) return next(err);

      if(user){
        res.send({error:true,message:"Email already exist!"})
      }
      else{

        var newUser=new User({
          email:email,
          password:password
        });
        User.createUser(newUser,function (err,user) {
          if(err) next(err);
          res.send({error:false,message:"Successfully Registered!",user})
        });
      }

    });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email,password,done) {
    User.getUserByEmail(email,function (err,user) {
        if(err) next(err);
        if(!user){
          return done(null,false,{message:'Unknown user'});
        }
        User.comparePassword(password,user.password,function (err,isMatch) {
            if(err) next(err);
            if(isMatch){
              return done(null,user);
            }
            else {
              return done(null,false,{message:'Incorrect password'});
            }
        })
    });
  }

//login authentication

router.post('/login',
  passport.authenticate('local'),function (req,res,user) {
    res.send({error:false,message:'Successfully logged in',user});
  }
);
