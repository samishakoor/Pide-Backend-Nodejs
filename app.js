const express = require("express");
const morgan = require("morgan");

const bankRouter = require("./routes/bankRoutes");
const fbrRouter = require("./routes/fbrRoutes");
const psebRouter = require("./routes/psebRoutes");
const secpRouter = require("./routes/secpRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/registration/secp", secpRouter);
app.use("/api/v1/registration/fbr", fbrRouter);
app.use("/api/v1/registration/bank", bankRouter);
app.use("/api/v1/registration/pseb", psebRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
