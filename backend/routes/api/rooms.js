const express = require('express')
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { restoreUser } = require('../../utils/auth');
const { setTokenCookie, requireAuth, checkPermissions } = require('../../utils/auth');
const { Room } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.get(
  '/:roomId(\\d+)',
  restoreUser,
  asyncHandler(async (req, res) => {
    const { roomId } = req.params;
    // console.log('roomid', roomId);
    const room = await Room.findByPk(roomId);
    // console.log(room);
    return res.json(room);
  })
);

router.get(
  '/',
  restoreUser,
  asyncHandler(async (req, res) => {
    const rooms = await Room.findAll({ order: [['updatedAt', 'DESC']], limit: 10 });
    // console.log(res.json(rooms));
    return res.json(rooms);
  })
);

router.post(
  '/',
  restoreUser,
  asyncHandler(async (req, res) => {
    console.log('in the room creator');
    const {
      ownerId,
      imageUrl,
      amenities,
      city,
      state,
      zip,
      country,
      address,
      title,
      description
    } = req.body;

    const room = await Room.create({
      ownerId,
      imageUrl,
      amenities,
      city,
      state,
      zip,
      country,
      address,
      title,
      description
    });
    return res.json(room);
  })
);

router.put(
  '/:roomId',
  restoreUser,
  asyncHandler(async (req, res, next) => {
    const {
      imageUrl,
      amenities,
      city,
      state,
      zip,
      country,
      address,
      userId,
      title,
      description
    } = req.body;
    const { roomId } = req.params;

    const room = await Room.findByPk(+roomId);
    console.log(room);
    console.log(userId);
    const canEdit = checkPermissions(userId, room);
    if (canEdit && room) {
      console.log('can edit');
      await room.set({
        imageUrl,
        amenities,
        city,
        state,
        zip,
        country,
        address,
        title,
        description
      });
      await room.save();
      return res.json({
        room
      });
    } else {
      const err = new Error('Unauthorized');
      err.title = 'Unauthorized';
      err.errors = ['Unauthorized'];
      err.status = 401;
      return next(err);
    }

    
  })
);
  
router.delete(
  '/:roomId',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { roomId } = req.params;
    const { userId } = req.body;
    const room = await Room.findByPk(roomId);
    const canEdit = checkPermissions(userId, room);
    if (canEdit && room) {
      await room.destroy();
      const myRooms = await Room.findAll({ where: {
        ownerId: userId
      } })
      console.log(room);
      return res.json(room);
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