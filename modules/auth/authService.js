const userService = require("./../user/user.service");
const userModel = require("./../user/userModel");
const bcrypt = require("bcrypt");
const config = require("../../config/config.json");
const jwt = require("jsonwebtoken");
const sendEmail = require("./../../helper/send-email");
const randomTokenString = require("./../../helper/randomTokenGenerator");
const resetToken = require("./resetTokenModel");

//login
async function auth(data) {
  const { email, password } = data;
  const user = await userService.findByEmail(email);
  const isMatched = bcrypt.compareSync(password, user.password);
  if (isMatched) {
    if (user.status === 0) throw "User not verified";
    //generate web token
    var token = generateJwtToken(user);
    return { user, token };
  } else throw "Invalid password";
}

//check email already rehistered or not before registering user
async function findByEmail(email) {
  const user = await userModel.findOne({ email: email });
  if (user) throw "Email already registered";
  return user;
}

async function register(data, ip) {
  const { email, password } = data;
  await findByEmail(email);
  const hash = bcrypt.hashSync(password, config.BCRYPT.SALT);
  const hashData = {
    email,
    hash,
  };
  const user = await userService.save(hashData);
  if (user) {
    // create reset token that expires after 24 hours
    const token = {
      code: randomTokenString(4), //it return four random number
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };
    const newToken = new resetToken({});
    newToken.user = user._id;
    newToken.token = token.code;
    newToken.expires = token.expires;
    newToken.createdByIp = ip;

    // send email
    await sendRegistrationEmail(user, token.code);
    await newToken.save();
    return user;
  } else {
    throw "Unable to send code";
  }
}

async function verifyToken(email, token, forwho) {
  const tokenInfo = await resetToken
    .findOne({
      token: token,
      expires: { $gt: Date.now() },
    })
    .populate("user", { password: 0 });
  if (!tokenInfo) throw "Invalid token";
  if (tokenInfo.user.email === email) {
    if (tokenInfo.status === 0) {
      tokenInfo.status = 1;
      const successtoken = await tokenInfo.save();
      if (forwho === "foruser") {
        const user = tokenInfo.user;
        user.status = 1;
        return await user.save();
      }
      return successtoken;
    } else {
      throw (msg = "Token already verified");
    }
  } else {
    throw "UnauthorizedError";
  }
}

//change password
async function chPassword(email, password) {
  const user = await userService.findByEmail(email);
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
  const user = await userService.findByEmail(email);
  // always return ok response to prevent email enumeration
  if (!user) return;
  // create reset token that expires after 24 hours
  const token = {
    code: randomTokenString(4), //it return four random number
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
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
  message = `<p>Please use this code ${token} to reset your password, the code will be valid for 1 day.</p>`;
  await sendEmail({
    to: account.email,
    subject: "eClass API - Reset Password",
    html: `<h4>Reset Password Email</h4>
             ${message}`,
  });
}

//for sending mail
async function sendRegistrationEmail(account, token) {
  let message;
  message = `<p>Please  <a href="https://bca-eclass-project.herokuapp.com/api/v1/auth/verify-user/${account.email}?code=${token}">Click Here</a>  to activate your account, the link will be valid for 1 day.</p>`;
  await sendEmail({
    to: account.email,
    subject: "eClass API - Activation Account",
    html: `<h4>Account Activation Email</h4>
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
