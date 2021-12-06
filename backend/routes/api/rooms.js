const express = require('express')
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { restoreUser } = require('../../utils/auth');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Room } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.get(
  '/',
  restoreUser,
  asyncHandler(async (req, res) => {
    const rooms = await Room.findAll();
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
      address
    } = req.body;

    const room = await Room.create({
      ownerId,
      imageUrl,
      amenities,
      city,
      state,
      zip,
      country,
      address
    });
    return res.json({
      room
    });
    
  })
);

router.put(
  '/',
  restoreUser,
  asyncHandler(async (req, res) => {
    const {
      imageUrl,
      amenities,
      city,
      state,
      zip,
      country,
      address,
      roomId
    } = req.body;

    const room = await Room.findByPk(roomId);
    
    await room.set({
      imageUrl,
      amenities,
      city,
      state,
      zip,
      country,
      address
    });
    return res.json({
      room
    });
    
  })
);
  
router.delete(
  '/',
  restoreUser,
  asyncHandler(async (req, res) => {
    const { roomId } = req.body;
    const room = await Room.findByPk(roomId);
    await room.destroy();
    return res.json({
      room
    });
    
  })
);

module.exports = router;