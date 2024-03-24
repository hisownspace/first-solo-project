const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const { Op } = require("sequelize");

const { restoreUser } = require("../../utils/auth");
const {
  setTokenCookie,
  requireAuth,
  checkPermissions,
} = require("../../utils/auth");
const { Room, Rental, Favorite } = require("../../db/models");
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

router.get(
  "/:roomId(\\d+)",
  restoreUser,
  asyncHandler(async (req, res) => {
    const { roomId } = req.params;
    const room = await Room.findByPk(roomId);
    return res.json(room);
  }),
);

router.post(
  "/:roomId(\\d+)/favorite",
  asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const { roomId } = req.params;
    const existingFavorite = await Favorite.findOne({
      where: {
        roomId,
        userId,
      },
    });
    if (!existingFavorite) {
      await Favorite.create({ roomId, userId });
    } else {
      await existingFavorite.destroy();
    }
    const userFavs = await Favorite.findAll({
      where: {
        userId,
      },
    });
    return res.json(userFavs.map((el) => el.roomId));
  }),
);

router.get(
  "/:roomId(\\d+)/rentals",
  restoreUser,
  asyncHandler(async (req, res) => {
    const { roomId } = req.params;
    const rentals = await Rental.findAll({
      where: {
        roomId,
      },
    });
    return res.json(rentals);
  }),
);

router.get(
  "/",
  restoreUser,
  asyncHandler(async (req, res) => {
    const rooms = await Room.findAll({
      order: [["updatedAt", "DESC"]],
      limit: 10,
    });
    return res.json(rooms);
  }),
);

router.get(
  "/search/:string",
  restoreUser,
  asyncHandler(async (req, res) => {
    const { string } = req.params;
    const rooms = await Room.findAll({
      order: [["updatedAt", "DESC"]],
      where: {
        [Op.or]: {
          title: { [Op.iLike]: `%${string}%` },
          description: { [Op.iLike]: `%${string}%` },
          state: { [Op.iLike]: `%${string}%` },
          city: { [Op.iLike]: `%${string}%` },
          amenities: { [Op.iLike]: `%${string}%` },
        },
      },
    });
    return res.json(rooms);
  }),
);

router.post(
  "/",
  restoreUser,
  asyncHandler(async (req, res) => {
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
      description,
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
      description,
    });
    return res.json(room);
  }),
);

router.put(
  "/:roomId",
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
      description,
    } = req.body;
    const { roomId } = req.params;

    const room = await Room.findByPk(+roomId);
    const canEdit = checkPermissions(userId, room);
    if (canEdit && room) {
      await room.set({
        imageUrl,
        amenities,
        city,
        state,
        zip,
        country,
        address,
        title,
        description,
      });
      await room.save();
      return res.json({
        room,
      });
    } else {
      const err = new Error("Unauthorized");
      err.title = "Unauthorized";
      err.errors = ["Unauthorized"];
      err.status = 401;
      return next(err);
    }
  }),
);

router.delete(
  "/:roomId",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { roomId } = req.params;
    const { userId } = req.body;
    const room = await Room.findByPk(roomId);
    const canEdit = checkPermissions(userId, room);
    if (canEdit && room) {
      await room.destroy();
      const myRooms = await Room.findAll({
        where: {
          ownerId: userId,
        },
      });
      return res.json(room);
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
