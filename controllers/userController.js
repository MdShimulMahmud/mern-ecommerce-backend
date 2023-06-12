const User = require("./../models/userModel");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    // insert new user by create one
    const newUser = await User.create(req.body);
    // newUser.save();
    res.status(201).json(newUser);
  } else {
    res.status(400).json({
      message: "User already exists!",
      success: false,
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });

  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json(findUser);
  } else {
    throw new Error("Invalid User. Password or email doesn't matched!");
  }
});

module.exports = { createUser, loginUser };
