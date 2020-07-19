//Middelwa re
function log1(req,res,next) {
  console.log("Middelware 1");
  next()
}

function log2(req,res,next) {
  console.log("Middelware 2");
  next()
}

module.exports = { log1 , log2 };
