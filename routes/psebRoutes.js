const express = require("express");
const authenticateUser = require("./../middlewares/userAuth");
const psebController = require("./../controllers/psebController");
const router = express.Router();

router
  .route("/")
  .get(psebController.getAllPsebDocuments)
  .post(authenticateUser, psebController.createPsebDocuments);

router
  .route("/userDocs")
  .get(authenticateUser, psebController.getPsebDocuments);

module.exports = router;
