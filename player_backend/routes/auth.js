const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");
const { getToken } = require("../utils/helper");

// for registering
router.post("/register", async (req, res) => {
  // req.body will be of the format
  // { email, password, username }
  const { email, password, username } = req.body;

  // checking if user with this email already exists
  // if yes we throw an error
  const user = await User.findOne({ email: email });
  if (user) {
    return res
      .status(403)
      .json({ error: "A user with this email already exists" });
  }

  // if email with this user does not exist
  // creating new user in the db
  // not storing password in plaintext, but as a hash
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUserData = { email, password: hashedPassword, username };

  // creating new user for the database
  const newUser = await User.create(newUserData);

  // creating a unique token for this new user from the helper function in utils folder
  const token = await getToken(email, newUser);

  // returning result to the user
  const userToReturn = { ...newUser.toJSON(), token };
  // for deleting the hash of the password, for security
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

// for logging in
router.post("/login", async (req, res) => {
  // get email and password set by user
  const { email, password } = req.body;

  // check if a user with the given email exists, if not it's invalid
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(403).json({ err: "Invalid credentials" });
  }

  // if user exists, check if password is correct. If not it's invalid
  // stored password is currently hashed
  // compares the plaintext password with the hashed password securely
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(403).json({ err: "Invalid credentials" });
  }

  // if the credentials are valid
  const token = await getToken(user.email, user);
  // returning result to the user
  const userToReturn = { ...user.toJSON(), token };
  // for deleting the hash of the password, for security
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

module.exports = router;
