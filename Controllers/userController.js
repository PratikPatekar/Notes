const User = require("../Models/user");
const { registerValidation, loginValidation } = require("../Models/validation");
const UserController = {};
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

UserController.register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(403).send(error.details[0].message);

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email Already Exists");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  };
  try {
    const savedUser = await User.register(user);
    res.json({
      message: "success",
      data: { user: savedUser._id },
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

UserController.login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("User Not Found!");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(403).send("Invalid Password");

  //Creating and assigning a JWT token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("authToken", token);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,authToken,Origin,Authorization"
  );
  res.header("Access-Control-Expose-Headers", "authToken");
  res.send("Logged in successfully");
};

module.exports = UserController;
