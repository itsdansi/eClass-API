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
    .register(req.body)
    .then((result) =>
      res.status(200).json({ message: "User registered sucessfully", result })
    )
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

function changePassword(req, res, next) {
  const email = req.params.email;
  const password = req.body.password;
  authService
    .chPassword(email, password)
    .then((result) => {
      res.status(200).json({
        message: "Your password change successfully, you can now login",
      });
    })
    .catch((err) => next(err));
}

function verifyToken(req, res, next) {
  authService
    .verifyToken(req.body)
    .then((result) => {
      res.status(200).json({
        result,
        message: "Token verified successfully, you can change password now",
      });
    })
    .catch((err) => next(err));
}

module.exports = {
  userAuthenticate,
  userRegister,
  forgotPassword,
  verifyToken,
  changePassword,
};
