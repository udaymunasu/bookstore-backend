var express = require("express");
var mongoose = require("mongoose");
let bodyparser = require("body-parser");
var cookieParser = require("cookie-parser")

var apiRouter = require("./routes/book");

var app = express();
app.use(express.static("assets"));


// view engine setup

app.use(bodyparser.json({ limit: '15360mb', extended: true, parameterLimit: 100000000 }));
app.use(bodyparser.urlencoded({ limit: '15360mb', extended: true, parameterLimit: 50000 }));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});


mongoose.connect("mongodb://localhost:27017/ecommerceproject");
let db = mongoose.connection;
db.on("error", error => console.log(error));
db.on("open", () => console.log("Connection Established"));

app.get("/", function (req, res) {
  res.send("Welcome to E-Commerce Back End");
  res.end();
});

app.use(cookieParser())

app.use("/api/books", apiRouter);
app.use("/api/role", require("./routes/role"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/users"));



// Middle ware to create succes and error message
app.use((obj, req, res, next) => {
  console.log("ojject", obj);
  const statusCode = obj.status || 500;
  const message = obj.message || " Something Went Wrong";
  const data = obj
  return res.status(statusCode).json({
    success: [200, 201, 204].some(a => a === obj.status) ? true : false,
    status: statusCode,
    message: message,
    data: data
  })
})



// const PORT = process.env.PORT || 8081;
app.listen(8081, (err) => {
  if (!err) {
    console.log(`Server is running on  http://localhost:8081/.`);
  } else {
    console.log("App crashed")
  }
});



module.exports = app;
