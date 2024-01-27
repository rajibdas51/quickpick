import asyncHandler from '../middleware/asyncMiddleware.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
//@desc Auth user & get token
// @route POST /api/users/login
//@access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  //console.log(req.body);
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '15d',
    });

    // Set JWT as HTTP-Only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password!!');
  }
});

//@desc Register User
//@route POST /api/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  res.send('Register User');
});

//@desc Logout User  / clear cookie
//@route POST /api/users/logout
//@access Private

const logoutUser = asyncHandler(async (req, res) => {
  res.send('Logout User');
});

//@desc Get user Profile
//@route GET /api/users/profile
//@access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  res.send(' update User Profile');
});

//@desc Update user Profile
//@route  PUT  /api/users/profile
//@access Private

const getUserProfile = asyncHandler(async (req, res) => {
  res.send(' get User Profile');
});

//@desc Get user Profile
//@route GET /api/users
//@access Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  res.send(' get Users');
});

//@desc Get user by id
//@route GET /api/users/:id
//@access Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  res.send(' get Users by Id');
});

//@desc Delete user
//@route DELETE /api/users/:id
//@access Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete user');
});
//@desc update user
//@route DELETE /api/users/:id
//@access Private/Admin

const updateUser = asyncHandler(async (req, res) => {
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
