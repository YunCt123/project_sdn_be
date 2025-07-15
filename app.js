var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const mongoose = require("mongoose");
const session = require("express-session");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger/swagger");
require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productRouter = require("./routes/productRouter");
var orderRouter = require("./routes/orderRouter");
var reviewRouter = require("./routes/reviewRouter");
var accountRouter = require("./routes/accountRouter");
var authRouter = require("./routes/authRouter");

var app = express();
app.use(
  session({
    secret: "hackerlor@",
    resave: false,
    saveUninitialized: true,
  })
);

// Connect to MongoDB
const uri = process.env.MONGO_URI;
const connect = mongoose.connect(uri);
connect.then((db) => {
  console.log("Connect ok!");
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Swagger Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
  })
);

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
// app.use("/reviews", reviewRouter);
app.use("/accounts", accountRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
    error: req.app.get("env") === "development" ? err : {}
  });
});

module.exports = app;
