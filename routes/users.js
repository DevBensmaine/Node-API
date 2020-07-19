const express = require("express");
const router = express.Router();
const { User, userValidation } = require('../model/User');
const mongoose = require('mongoose')
const _ = require('lodash');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');



//regiter

router.post("/", async (req, res) => {
  const { error } = userValidation(res.body);

  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  // let user = new  User({
  //   fullname: req.body.fullname,
  //   email: req.body.email,
  //   password: req.body.password,
  // })
  let user =  await User.findOne({email:req.body.email});
  if (user) {
    return res.status(404).send('user found');
  }

    user = new  User( _.pick(req.body , ['fullname','email','password']))
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    user.password = await bcrypt.hash(user.password,saltRounds)

    await user.save();

  const token = user.generateTokens();
  //res.send("post add " + user.email);
  // res.send(_.pick(user , ['_id','fullname','email']))
  res.header('x-auth-token',token).send(_.pick(user , ['_id','fullname','email']))
});

module.exports = router;