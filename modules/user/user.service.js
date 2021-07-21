const userModel = require("./userModel");
const helper = require("./../../helper/isValid");

//function for saving user data
function save(data) {
  var newUser = new userModel({});
  newUser.email = data.email;
  newUser.password = data.hash;
  return newUser.save();
}

//function for getting all user data
function getAll() {
  return userModel.find({});
}

//function for getting user data by id
async function findById(id) {
  if (!helper.isValidId(id)) throw "Invalid user id:" + ` ${id}`;
  const user = await userModel.findById(id);
  if (!user) throw "User with" + ` ${id} ` + "not found";
  return user;
}

//function find by email
async function findByEmail(email) {
  const user = await userModel.findOne({ email: email });
  if (!user) throw "User with email_id: " + ` ${email} ` + "not found";
  return user;
}

//function for deleting user
async function remove(id) {
  const user = await findById(id);
  await user.remove(id);
}

//function for updating user detail
async function update(id, data) {
  const userDetail = await findById(id);
  // copy params to userDetail and save
  Object.assign(userDetail, data);
  return userDetail.save();
}

module.exports = {
  save,
  getAll,
  findById,
  remove,
  update,
  findByEmail,
};
