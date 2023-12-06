const bankRouter = require("./routes/bankRoutes");
const fbrRouter = require("./routes/fbrRoutes");
const psebRouter = require("./routes/psebRoutes");
const secpRouter = require("./routes/secpRoutes");
const userRouter = require("./routes/userRoutes");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
require("express-validator");

const app = express();
app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(helmet());
app.use(express.static(__dirname));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

app.use(mongoSanitize());
app.use(xss());

app.use("/api/v1/pideReg/secp", secpRouter);
app.use("/api/v1/pideReg/fbr", fbrRouter);
app.use("/api/v1/pideReg/bank", bankRouter);
app.use("/api/v1/pideReg/pseb", psebRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
