const { validationResult } = require('express-validator');

const HttpError = require('../models/handle-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;
  try {
    // find takes projection string as 2nd arg.
    users = await User.find({}, '-password');
  } catch (err) {
    return next(
      new HttpError('Could not find users. Please try again later', 500)
    );
  }
  return res
    .status(200)
    .json({ users: users.map((u) => u.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  // We added a middleware to the route where we receive user input
  // validationResult extracts validation errors from req object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError(
        'Invalid inputs entered. Please check your data and try again',
        422
      )
    );
  }
  const { name, email, password } = req.body;

  // check if the user with provided email already exists
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(
      new HttpError(
        'An error occurred while checking existing user. Please try again later',
        500
      )
    );
  }

  if (existingUser) {
    return next(
      new HttpError('Could not create a user. Email already exists.', 422)
    );
  }

  // create new user with given info
  const newUser = new User({
    name,
    email,
    image: 'https://placem.at/people?w=400',
    password,
    places: [],
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(
      new HttpError('Signing up failed. Please try again later', 500)
    );
  }
  return res.status(201).json({ user: newUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // check if the user with provided email already exists
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(
      new HttpError(
        'An error occurred while checking existing user. Please try again later',
        500
      )
    );
  }

  if (!existingUser) {
    return next(
      new HttpError('Could not find a user with the given email.', 422)
    );
  }

  if (existingUser && existingUser.password !== password) {
    return next(new HttpError('Please check your password and try again', 422));
  }

  return res.status(200).json({
    message: 'Logged in!',
    user: existingUser.toObject({ getters: true }),
  });
};

module.exports = {
  getUsers,
  signup,
  login,
};
