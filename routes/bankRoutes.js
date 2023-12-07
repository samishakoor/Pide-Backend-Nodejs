const express = require("express");
const bankController = require("./../controllers/bankController");
const router = express.Router();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return next(new AppError("Authentication Header is missing", 401));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(new AppError("Token Not Found", 401));
  }

  const tokenStatus = verifyToken(token);
  if (tokenStatus == "expired token") {
    return next(new AppError("token expired", 401));
  }

  req.tokenData = tokenStatus;
  next();
};

router
  .route("/")
  .get(bankController.getAllBankDocuments)
  .post(authenticateToken, bankController.createBankDocuments);

router.route("/:id").get(authenticateToken, bankController.getBankDocuments);

module.exports = router;
