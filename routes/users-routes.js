const express = require('express');
const { check } = require('express-validator');
const { getUsers, signup, login } = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', getUsers);

router.post(
  '/signup',
  // checks the value of the property on the following fields
  // req.(body|cookies|headers|params|query)
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  signup
);
// Don't need validation since we're not writing to the db for logging in
router.post('/login', login);

module.exports = router;
