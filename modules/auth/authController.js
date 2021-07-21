const authService = require("./authService");

function userAuthenticate(req, res, next) {
  authService
    .auth(req.body)
    .then((result) => {
      res.status(200).json({ message: "User logged in sucessfully", result });
    })
    .catch((err) => next(err));
}

function userRegister(req, res, next) {
  authService
    .register(req.body, req.ip)
    .then((result) =>
      res.status(200).json({
        message:
          "User registered sucessfully please check email for activation code",
        result,
      })
    )
    .catch((err) => next(err));
}

// function to change password after login
function changePasswordAfterlogin(req, res, next) {
  const email = req.params.email;
  const password = req.body.password;
  const newPassword = req.body.newPassword;
  authService
    .chPasswordAfterLogin(email, password, newPassword)
    .then((result) => {
      res.status(200).json({
        message: "Password changed successfully! ",
      });
    })
    .catch((err) => next(err));
}

function forgotPassword(req, res, next) {
  authService
    .fPassword(req.body.email, req.ip)
    .then(() =>
      res.status(200).json({
        message: "Please check your email for password reset instructions",
      })
    )
    .catch((err) => next(err));
}

// function to change password through forgot-password option
function changePassword(req, res, next) {
  const email = req.params.email;
  const password = req.body.password;
  authService
    .chPassword(email, password)
    .then((result) => {
      res.status(200).json({
        message: "Password changed successfully, you can now login",
      });
    })
    .catch((err) => next(err));
}

function verifyUserToken(req, res, next) {
  authService
    .verifyToken(req.params.email, req.query.code, "foruser")
    .then((result) => {
      res.status(200).json({
        result,
        message: "User verified successfully, you can login now",
      });
    })
    .catch((err) => next(err));
}
function verifyToken(req, res, next) {
  authService
    .verifyToken(req.params.email, req.body.token, "forfpass")
    .then((result) => {
      res.status(200).json({
        result,
        message:
          "Token verified successfully, you can go ahead for further processing",
      });
    })
    .catch((err) => next(err));
}
module.exports = {
  userAuthenticate,
  userRegister,
  forgotPassword,
  verifyUserToken,
  verifyToken,
  changePassword,
  changePasswordAfterlogin,
};
