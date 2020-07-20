const mongoose = require("mongoose"); 
const Joi = require("@hapi/joi");
const jwt = require('jsonwebtoken');
const { boolean } = require("@hapi/joi");

const UserSchema = mongoose.Schema({
  fullname: {
    type:String,
    required:true,
    minlength:3,
    maxlength:44
  } ,
  email :{
    type:String,
    required:true,
    unique:true,
    minlength:3,
    maxlength:255
  },
  password :{
    type:String,
    required:true,
    minlength:8,
    maxlength:1024
  } ,
  isAdmin : {
    type:Boolean,
  }

})

UserSchema.methods.generateTokens = function () {
  const token =  jwt.sign({_id:this._id , isAdmin:this.isAdmin} ,'Privatekey');
   return token
}
const User = mongoose.model('User',UserSchema)


function userValidation(user) {
  const schema = Joi.object({
    fullname: Joi.string().min(3).max(44).required(),
    email: Joi.string().min(3).max(44).required().email(),
    password:  Joi.string().min(3).max(255).required(),
  });

  return schema.validate(user);
}

exports.User = User
exports.userValidation = userValidation
