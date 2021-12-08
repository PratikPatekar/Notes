const { userSchema } = require("./db");

const User = {};

User.register = (data) => {
  const user = new userSchema(data);
  return user.save();
};

User.findOne = (data) => {
  const email = userSchema.findOne(data);
  return email;
};

module.exports = User;
