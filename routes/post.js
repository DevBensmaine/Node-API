const express = require("express");
const Joi = require("@hapi/joi"); // validation
  
const {Post} = require('../model/Post');
const auth =  require('../middleware/auth')


const router = express.Router();


router.get("/",  async(req, res) => {
  const posts = await Post.find().sort('name')
  res.send(posts);
});

router.get("/:id",async (req, res) => {
  let id = req.params.id;
  // const postFind = posts.find((post) => post.id == id);
  const postFind = await Post.findById(id);

  if (!postFind) {
    res.send("this post is not found !");
  }
  res.send(postFind);
});

//POST ADD Post

router.post("/",auth, async (req, res) => {
  const { error } = PostValidation(res.body);

  if (error) {
    return res.send(error.details[0].message);
  }

  let post = new Post({
    userId: req.body.userId,
    title: req.body.title,
    body: req.body.body,
  })

  await post.save();
  // res.send(post)
  // posts.push(posts);
  res.send("post add " + post.title);
});

//Update
router.put("/:id", async (req, res) => {
  let id = req.params.id;
  // const postFind = posts.find((post) => post.id == id);

  const { error } = PostValidation(res.body);

  if (error) {
    return res.send(error.details[0].message);
  }

  // if (!postFind) {
  //   return res.send("this post is not found !");
  // }
  // postFind.title = req.body.title;

  const post = await Post.findByIdAndUpdate(id , {
    title:req.body.title
  },{new : true})

  if (!post) {
    return res.status(404).send('INVALIDE ID');
  }

  res.send(post);
});

//Delete
router.delete("/:id",  async (req, res) => {
  let id = req.params.id;
  // const postFind = posts.find((post) => post.id == id);
  const postFind = await Post.findByIdAndDelete(id)

  const { error } = PostValidation(res.body);

  if (error) {
    return res.send(error.details[0].message);
  }

  if (!postFind) {
    return res.send("this post is not found !");
  }

  // const postIndex = posts.indexOf(postFind);
  // posts.splice(postIndex, 1);

  res.send(postFind);
});

function PostValidation(post) {
  const schema = Joi.object({
    userId: Joi.number().integer().required(),
    id: Joi.number().integer().required(),
    title: Joi.string().min(3).required(),
    body: Joi.string().min(3).required(),
  });

  return schema.validate(post);
}

module.exports = router;
