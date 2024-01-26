import asyncHandler from '../middleware/asyncMiddleware.js';
import User from '../models/userModel.js';

//@desc Auth user & get token
// @route POST /api/users/login
//@access Public

const authUser = asyncHandler((req, res) => {
  res.send('auth User');
});

//@desc Register User
//@route POST /api/users
//@access Public

const registerUser = asyncHandler((req, res) => {
  res.send('Register User');
});

//@desc Logout User  / clear cookie
//@route POST /api/users/logout
//@access Private

const logoutUser = asyncHandler((req, res) => {
  res.send('Logout User');
});

//@desc Get user Profile
//@route GET /api/users/profile
//@access Private

const updateUserProfile = asyncHandler((req, res) => {
  res.send(' update User Profile');
});

//@desc Update user Profile
//@route  PUT  /api/users/profile
//@access Private

const getUserProfile = asyncHandler((req, res) => {
  res.send(' get User Profile');
});

//@desc Get user Profile
//@route GET /api/users
//@access Private/Admin

const getUsers = asyncHandler((req, res) => {
  res.send(' get Users');
});

//@desc Get user by id
//@route GET /api/users/:id
//@access Private/Admin

const getUserById = asyncHandler((req, res) => {
  res.send(' get Users by Id');
});

//@desc Delete user
//@route DELETE /api/users/:id
//@access Private/Admin

const deleteUser = asyncHandler((req, res) => {
  res.send('delete user');
});
//@desc update user
//@route DELETE /api/users/:id
//@access Private/Admin

const updateUser = asyncHandler((req, res) => {
  res.send('update user');
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
