const User = require("./../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("./../config/jwtToken");
// Create new user
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
//login a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });

  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.status(400).json({
      _id: findUser._id,
      firstName: findUser?.firstName,
      lastName: findUser?.lastName,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser._id),
    });
  } else {
    throw new Error("Invalid User. Password or email doesn't matched!");
  }
});

// get a single user

const getUser = asyncHandler(async (req, res) => {
  try {
    const getUser = await User.findById(req.params.id);
    res.status(200).json(getUser);
  } catch (error) {
    throw new Error({
      error,
      message: "User id doesn't match!",
    });
  }
});

// delete a user
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteUser);
  } catch (error) {
    throw new Error({ error, message: "User id doesn't match!" });
  }
});

// update a user

const updatedUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    throw new Error({ error, message: "User id doesn't match!" });
  }
});

// get all users
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    throw new Error(error);
  }
});
// upto authentication done
module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUser,
  deleteUser,
  updatedUser,
};
