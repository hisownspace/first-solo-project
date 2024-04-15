const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const { Op } = require("sequelize");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const { restoreUser } = require("../../utils/auth");
const {
  setTokenCookie,
  requireAuth,
  checkPermissions,
} = require("../../utils/auth");
const {
  Room,
  RoomImage,
  Rental,
  Favorite,
  RoomAmenity,
} = require("../../db/models");
const {
  uploadFileToS3,
  retrieveFileFromS3,
} = require("../../utils/aws_helpers");
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

router.get(
  "/:roomId(\\d+)",
  restoreUser,
  asyncHandler(async (req, res) => {
    const { roomId } = req.params;
    const room = await Room.findByPk(roomId, {
      include: [RoomAmenity, RoomImage],
    });
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
  "/images/:key",
  restoreUser,
  asyncHandler(async (req, res) => {
    console.log("HELLO");
    const { key } = req.params;
    const image = await retrieveFileFromS3(key);
    image.pipe(res);
  }),
);

router.get(
  "/",
  restoreUser,
  asyncHandler(async (req, res) => {
    const rooms = await Room.findAll({
      order: [["updatedAt", "DESC"]],
      include: [RoomImage, RoomAmenity],
    });
    return res.json(rooms);
  }),
);

router.post(
  "/search",
  restoreUser,
  asyncHandler(async (req, res) => {
    let { searchValue, checkInDate, checkOutDate } = req.body;
    if (checkInDate === "" || checkOutDate === "") {
      checkInDate = new Date(0, 0, 0, 0, 0, 0);
      checkOutDate = new Date(0, 0, 0, 0, 0, 0);
    }

    if (checkInDate === null) {
      console.log(searchValue);
      let rooms = await Room.findAll({
        order: [["updatedAt", "DESC"]],
        include: [
          {
            model: RoomAmenity,
            where: {
              amenityId: { [Op.eq]: searchValue },
            },
          },
        ],
      });
      console.log(rooms);
      return res.json(rooms);
    }

    checkInDate = new Date(checkInDate);
    checkOutDate = new Date(checkOutDate);

    checkOutDate.setDate(checkOutDate.getDate() + 1);

    let rooms = await Room.findAll({
      order: [["updatedAt", "DESC"]],
      where: {
        [Op.or]: {
          title: { [Op.iLike]: `%${searchValue}%` },
          description: { [Op.iLike]: `%${searchValue}%` },
          state: { [Op.iLike]: `%${searchValue}%` },
          city: { [Op.iLike]: `%${searchValue}%` },
        },
      },
      include: [
        {
          model: Rental,
          required: false,
          where: {
            [Op.or]: {
              checkIn: { [Op.gt]: checkInDate, [Op.lt]: checkOutDate },
              checkOut: { [Op.gt]: checkInDate, [Op.lt]: checkOutDate },
            },
          },
        },
      ],
    });
    rooms = rooms.filter((el) => {
      return el.Rentals.length === 0;
    });
    console.log(rooms);
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
  upload.any(),
  restoreUser,
  asyncHandler(async (req, res) => {
    console.log("HELLO");
    const {
      ownerId,
      roomAmenities,
      city,
      state,
      zip,
      country,
      address,
      title,
      description,
    } = req.body;
    const files = req.files;

    const amenities = roomAmenities.split(",").map(Number);

    const room = await Room.create({
      ownerId,
      city,
      state,
      zip,
      country,
      address,
      title,
      description,
      cost: 900,
    });

    for (let i = 0; i < amenities.length; i++) {
      await RoomAmenity.create({
        amenityId: amenities[i],
        roomId: room.id,
      });
    }

    for (let file of files) {
      const imageUrl = await uploadFileToS3(file);
      await RoomImage.create({
        roomId: room.id,
        imageUrl,
      });
    }

    return res.json(room);
  }),
);

router.get(
  "/:roomId/amenities",
  restoreUser,
  asyncHandler(async (req, res, next) => {
    const { roomId } = req.params;
    const amenities = await RoomAmenity.findAll({
      where: { roomId },
    });
    console.log(amenities);
    return res.json(amenities);
  }),
);

router.put(
  "/:roomId",
  restoreUser,
  asyncHandler(async (req, res, next) => {
    const {
      imageUrl,
      roomAmenities,
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
        roomAmenities,
        city,
        state,
        zip,
        country,
        address,
        title,
        description,
      });
      await room.save();
      RoomAmenity.destroy({ where: { roomId } });
      for (let i = 0; i < roomAmenities.length; i++) {
        await RoomAmenity.create({
          amenityId: roomAmenities[i],
          roomId: room.id,
        });
      }
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
