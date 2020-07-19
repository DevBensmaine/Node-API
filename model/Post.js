const mongoose = require("mongoose"); 
const Post = mongoose.model('Post',new mongoose.Schema({

  userId: {
    type:Number,
    required:true,
  },
  title:{
    type:String,
    required:true,
    minlength:3,
    maxlength:25
  },
  body: {
    type:String,
    required:true,
    minlength:3,
    maxlength:255
  },
}))


exports.Post = Post
