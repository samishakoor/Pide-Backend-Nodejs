const express = require("express");
const fbrController = require("./../controllers/fbrController");
const authenticateUser = require("../middlewares/userAuth");
const fbrDocsUpload = require("./../middlewares/fbrDocsUpload");
const router = express.Router();

router
  .route("/")
  .get(fbrController.getAllFbrDocuments)
  .post(authenticateUser, fbrDocsUpload, fbrController.createFbrDocuments);

router.route("/docs").get(authenticateUser, fbrController.getFbrDocuments);

module.exports = router;
