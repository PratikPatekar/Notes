const app = require("express").Router();
const { userSchema } = require("../Models/db");
const UserController = require("../Controllers/userController");

app.post("/register", UserController.register);

app.post("/login", UserController.login);

module.exports = app;
