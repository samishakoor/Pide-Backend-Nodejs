const express = require("express");
const fbrController = require("./../controllers/fbrController");
const authenticateUser = require("../middlewares/userAuth");

const router = express.Router();

router
  .route("/")
  .get(fbrController.getAllFbrDocuments)
  .post(authenticateUser, fbrController.createFbrDocuments);

router.route("/userDocs").get(authenticateUser, fbrController.getFbrDocuments);

module.exports = router;
