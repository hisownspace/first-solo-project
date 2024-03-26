const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const { restoreUser } = require("../../utils/auth");
const {
  setTokenCookie,
  requireAuth,
  checkPermissions,
} = require("../../utils/auth");
const { Rental, Room, Amenity } = require("../../db/models");

router.get(
  "/",
  restoreUser,
  asyncHandler(async (req, res) => {
    const amenities = await Amenity.findAll();
    return res.json(amenities);
  }),
);

module.exports = router;
