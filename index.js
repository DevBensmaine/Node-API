const express = require("express");
const loggin = require("./logger/logging");
const helmet = require("helmet");
const morgan = require("morgan"); ///logger app
const post = require("./posts/post");

const app = new express();
app.use(express.json());
app.use(helmet());
app.use("/api/posts", post);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  //Middelwa re
  app.use(loggin.log1);
  app.use(loggin.log2);
}

const port = process.env.port || 4030;
app.listen(port, () => console.log("server started in port : " + port));
