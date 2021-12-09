const express = require('express')
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { restoreUser } = require('../../utils/auth');
const { setTokenCookie, requireAuth, checkPermissions } = require('../../utils/auth');
const { Rental, Room } = require('../../db/models');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

router.post(
  '/',
  restoreUser,
  asyncHandler(async (req, res) => {
    const {
      renterId,
      roomId,
      guests,
      checkIn,
      checkOut
    } = req.body;

    const rental = await Rental.create({
      renterId,
      roomId,
      guests,
      checkIn,
      checkOut
    });
    return res.json(rental);
  })
);

router.get(
  '/:rentalId(\\d+)',
  restoreUser,
  asyncHandler(async (req, res) => {
    const { rentalId } = req.params;
    const rental = await Rental.findByPk(rentalId);
    return res.json(rental);

  })
);

router.get(
  '/',
  restoreUser,
  asyncHandler(async (req, res) => {
    const rentals = await Rental.findAll({ order: [['updatedAt', 'DESC']], limit: 10 });
    return res.json(rentals);
  })
);

router.delete(
  '/:rentalId',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { rentalId } = req.params;
    const { userId } = req.body;
    const rental = await Rental.findByPk(rentalId);
    console.log(rental);
    let canEdit;
    if (rental && userId !== rental.renterId) {
      const room = Room.findByPk(rental.roomId);
      canEdit = checkPermissions(userId, room);
    } else {
      canEdit = checkPermissions(userId, rental);
    }
    if (canEdit && rental) {
      await rental.destroy();
      const myRentals = await Rental.findAll({ where: {
        renterId: userId
      }});
      const myRoomRentals = await Rental.findAll({ include: {
        model: Room,
        where: {
          ownerId: userId
        }
      }})
      console.log(myRentals);
      console.log(myRoomRentals);
      return res.json(myRentals);
    } else {
      const err = new Error('Unauthorized');
      err.title = 'Unauthorized';
      err.errors = ['Unauthorized'];
      err.status = 401;
      return next(err);
    }
  })
);

module.exports = router;