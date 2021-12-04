const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { restoreUser } = require('../../utils/auth.js');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

module.exports = router;