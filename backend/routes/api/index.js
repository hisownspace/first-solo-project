const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const { restoreUser } = require("../../utils/auth.js");
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");

const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const roomsRouter = require("./rooms.js");
const rentalsRouter = require("./rentals.js");

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/rooms", roomsRouter);

router.use("/rentals", rentalsRouter);

module.exports = router;
