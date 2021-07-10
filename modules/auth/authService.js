const userRouter = require("./../user/userRoute");
const userModel = require("./../user/userModel");
const bcrypt = require("bcrypt");
const config = require("./../../config/config.json");
const jwt = require("jsonwebtoken");
const sendEmail = require("./../../helper/send-email");
const randomTokenString = require("./../../helper/randomTokenGenerator");
const resetToken = require("./resetTokenModel");
const { token } = require("morgan");
//login
async function auth(data) {
  const { email, password } = data;
  const user = await userModel.findOne({ email: email });
  if (!user) throw "User with email Id : " + ` ${email} ` + "not found";
  const isMatched = bcrypt.compareSync(password, user.hash);
  if (isMatched) {
    //generate web token
    var token = generateJwtToken(user);
    return { user, token };
  } else throw "Invalid password";
}

//check email already registered or not before registering user
async function findByEmail(email) {
  const user = await userModel.findOne({ email: email });
  if (user) throw "Email already registered";
  return user;
}

async function register(data) {
  const { email, password } = data;
  await findByEmail(email);
  const hash = bcrypt.hashSync(password, config.BCRYPT.SALT);
  const user = new userModel({
    email: email,
    password: hash,
  });
  // console.log(user)

  user
    .save()
    .then((createdUser) => {
      res.status(201).json(createdUser);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err,
      });
    });
  np;

  return user;
}

async function verifyToken({ token }) {
  const tokenInfo = await resetToken
    .findOne({
      token: token,
      expires: { $gt: Date.now() },
    })
    .populate("user", { password: 0 });

  if (!tokenInfo) throw "Invalid token";

  return tokenInfo;
}

//change password
async function chPassword(email, password) {
  const user = await userModel.findOne({ email: email });
  const hashPasword = bcrypt.hashSync(password, config.BCRYPT.SALT);
  user.password = hashPasword;
  return user.save();
}

// create a jwt token containing the user id
function generateJwtToken(user) {
  return jwt.sign({ id: user._id }, config.JWT.JWT_SECRET, { expiresIn: "1d" });
}

//forgot password and send code to email
async function fPassword(email, ip) {
  const user = await userModel.findOne({ email: email });
  // always return ok response to prevent email enumeration
  if (!user) return;
  // create reset token that expires after 24 hours
  const token = {
    code: randomTokenString(4), //it return four random number
    expires: new Date(Date.now() + 10 * 60 * 1000),
  };
  const newToken = new resetToken({});
  newToken.user = user._id;
  newToken.token = token.code;
  newToken.expires = token.expires;
  newToken.createdByIp = ip;

  // send email
  await sendPasswordResetEmail(user, token.code);

  await newToken.save();
}

//for sending mail
async function sendPasswordResetEmail(account, token) {
  let message;
  message = `<p>Please use this code ${token} to reset your password, the code will be valid for 10 minutes form now.</p>`;
  await sendEmail({
    to: account.email,
    subject: "eClass API - Reset Password",
    html: `<h4>Reset Password Email</h4>
             ${message}`,
  });
}

module.exports = {
  auth,
  register,
  verifyToken,
  chPassword,
  fPassword,
};
