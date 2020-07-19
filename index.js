const express = require("express");
const loggin = require("./logger/logging");
const helmet = require("helmet");
const morgan = require("morgan"); ///logger app
const mongoose = require("mongoose"); 
const post = require("./routes/post");
const users = require("./routes/users");


mongoose
  .connect("mongodb://localhost/mycompany", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log(error));

  mongoose.set('useCreateIndex', true);

const app = new express();
app.use(express.json());
app.use(helmet());
//////
app.use("/api/posts", post);
app.use("/api/users", users);

///

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  //Middelwa re
  app.use(loggin.log1);
  app.use(loggin.log2);
}

const port = process.env.port || 4030;
app.listen(port, () => console.log("server started in port : " + port));
