const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const { restoreUser } = require("../../utils/auth");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Rental, Room, Favorite } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const user = await User.signup({
      email,
      username,
      password,
      firstName,
      lastName,
    });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

router.get(
  "/:userId(\\d+)/favorites",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const favorites = await Favorite.findAll({
      where: {
        userId,
      },
    });
    return res.json(favorites.map((el) => el.roomId));
  }),
);

router.get(
  "/:userId(\\d+)/rentals",
  restoreUser,
  asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const renterRentals = await Rental.findAll({
      where: { renterId: userId },
      order: [["updatedAt", "DESC"]],
      limit: 10,
    });
    const ownerRentals = await Rental.findAll({
      include: {
        model: Room,
        where: {
          ownerId: userId,
        },
      },
    });
    return res.json({ renterRentals, ownerRentals });
  }),
);

module.exports = router;
