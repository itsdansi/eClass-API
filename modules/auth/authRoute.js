const express = require("express");
const router = express.Router();
const authController = require("./authController");

router.route("/login").post(authController.userAuthenticate);
router.route("/register").post(authController.userRegister);
router.route("/forgot-password").post(authController.forgotPassword);
router.route("/verify-user/:email").get(authController.verifyUserToken);
router.route("/verify-token/:email").post(authController.verifyToken);
router.route("/changepassword/:email").put(authController.changePassword);

module.exports = router;
