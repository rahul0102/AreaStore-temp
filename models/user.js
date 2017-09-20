const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//user schema
const userSchema= new Schema({
    name:{
      type:String
    },
    email:{
      type:String
    },
    password:{
      type:String
    },
    google:{
      id:{type:String},
      token:{type:String}
    }
  }
);

//create module of user and export it to app
const User=mongoose.model('User',userSchema);

//saving user to db
module.exports.createUser=function (newUser) {
    newUser.save();
}

//getting user by email
module.exports.getUserByEmail=function (userEmail) {
    var query={email:userEmail};
    User.findOne(query);
}
//getting user by id
module.exports.getUserById=function (userId) {
  User.findById(userId);
}

module.exports=User;
