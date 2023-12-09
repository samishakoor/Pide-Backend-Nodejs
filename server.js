const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
// const fs = require("fs");
// const https = require("https");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 3000;

// const credentials = {
//   key: fs.readFileSync(process.env.PRIVATE_KEY_PATH, "utf8"),
//   cert: fs.readFileSync(process.env.CERTIFICATE_PATH, "utf8"),
// };

// const httpsServer = https.createServer(credentials, app);
// httpsServer.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
