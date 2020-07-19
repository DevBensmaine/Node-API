const express = require("express");
const router = express.Router();
const { User } = require('../model/User');
const mongoose = require('mongoose')
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require("@hapi/joi");
const jwt = require('jsonwebtoken');


router.post("/", async (req, res) => {
  const { error } = authValidation(res.body);

  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  let user =  await User.findOne({email:req.body.email});
  if (!user) {
    return res.status(404).send('invalide email or password');
  }


 const checkPwd= await bcrypt.compare(req.body.password, user.password)
 if (!checkPwd) {
  return res.status(404).send('invalide email or password');
}
const token = user.generateTokens();

res.send(token)
 

 
});


function authValidation(req) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(44).required().email(),
    password:  Joi.string().min(3).max(255).required(),
  });

  return Joi.validate(req,schema);
}


module.exports = router;