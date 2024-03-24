const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const { restoreUser } = require("../../utils/auth");
const {
  setTokenCookie,
  requireAuth,
  checkPermissions,
} = require("../../utils/auth");
const { Rental, Room } = require("../../db/models");
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

router.post(
  "/",
  restoreUser,
  asyncHandler(async (req, res, next) => {
    const { renterId, roomId, guests, checkIn, checkOut } = req.body;

    const rentals = await Rental.findAll({
      where: {
        roomId,
      },
    });

    const yearIn = new Date(checkIn).getFullYear();
    const monthIn = new Date(checkIn).getMonth();
    const dateIn = new Date(checkIn).getDate();

    const yearOut = new Date(checkOut).getFullYear();
    const monthOut = new Date(checkOut).getMonth();
    const dateOut = new Date(checkOut).getDate();

    const dates = rentals.map((rental) => {
      return {
        checkIn: {
          year: rental.checkIn.getFullYear(),
          month: rental.checkIn.getMonth(),
          date: rental.checkIn.getDate(),
        },
        checkOut: {
          year: rental.checkOut.getFullYear(),
          month: rental.checkOut.getMonth(),
          date: rental.checkOut.getDate(),
        },
      };
    });

    const valid = dates.reduce((accum, date) => {
      if (yearOut < date.checkIn.year || yearIn > date.checkOut.year) {
        return accum;
      } else if (
        monthOut < date.checkIn.month ||
        monthOut > date.checkOut.month
      ) {
        return accum;
      } else if (dateOut < date.checkIn.date || dateOut > date.checkOut.date) {
        return accum;
      }
      return false;
    }, true);

    if (valid) {
      const rental = await Rental.create({
        renterId,
        roomId,
        guests,
        checkIn,
        checkOut,
      });
      return res.json(rental);
    } else {
      const err = new Error("Unauthorized");
      err.title = "Unauthorized";
      err.errors = ["Unauthorized"];
      err.status = 401;
      return next(err);
    }
  }),
);

router.get(
  "/:rentalId(\\d+)",
  restoreUser,
  asyncHandler(async (req, res) => {
    const { rentalId } = req.params;
    const rental = await Rental.findByPk(rentalId);
    return res.json(rental);
  }),
);

router.delete(
  "/:rentalId",
  restoreUser,
  asyncHandler(async (req, res, next) => {
    const { rentalId } = req.params;
    const { userId } = req.body;
    const rental = await Rental.findByPk(rentalId);
    let canEdit;
    if (rental && userId !== rental.renterId) {
      const room = await Room.findByPk(rental.roomId);
      canEdit = checkPermissions(userId, room);
    } else {
      canEdit = checkPermissions(userId, rental);
    }
    if (canEdit && rental) {
      await rental.destroy();
      const myRentals = await Rental.findAll({
        where: {
          renterId: userId,
        },
      });
      const myRoomRentals = await Rental.findAll({
        include: {
          model: Room,
          where: {
            ownerId: userId,
          },
        },
      });
      return res.json({ myRentals, myRoomRentals });
    } else {
      const err = new Error("Unauthorized");
      err.title = "Unauthorized";
      err.errors = ["Unauthorized"];
      err.status = 401;
      return next(err);
    }
  }),
);

module.exports = router;
