const express = require('express')
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { restoreUser, checkPermissions } = require('../../utils/auth');
const { setTokenCookie, requireAuth, checkPermissions } = require('../../utils/auth');
const { Review, User } = require('../../db/models');

router.get(
  '/rooms/:roomId/reviews',
  restoreUser,
  asyncHandler(async (req, res, next) => {
    const { roomId } = req.params;
    const reviews = await Review.findAll(
      { where: {
        roomId
      }, include: User
    });
    return res.json(reviews);
  }));
  
  router.post(
    '/reviews',
    restoreUser,
    asyncHandler(async (req, res) => {
      const {
        roomId,
        userId,
        content,
        rating
      } = req.body;

      const review = await Review.create({
        roomId,
        userId,
        content,
        rating
      });

      return res.json(review);
    }));

    router.delete(
      '/reviews/:reviewId',
      restoreUser,
      asyncHandler(async (req, res) => {
        const { reviewId } = req.params;
        const { userId } = req.body;
        const review = await Review.findByPk(reviewId);
        const canEdit = checkPermissions(userId, review);

        if (canEdit && review) {
          await review.destroy();
          const reviews = await Review.findAll();
          return res.json(reviews)
        } else {
          const err = new Error('Unauthorized');
          err.title = 'Unauthorized';
          err.errors = ['Unauthorized'];
          err.status = 401;
          return next(err);
        }
      }));

      router.put(
        '/:reviewId',
        restoreUser,
        asyncHandler(async (req, res, next) => {
          const {
              userId,
              rating,
              content,
          } = req.body;
          const { reviewId } = req.params;
          const review = await Review.findByPk(+reviewId);
          const canEdit = checkPermissions(userId, review);
          if (canEdit && review) {
            await review.set({
              rating,
              content
            });
            await review.save();
            return res.json(review);
          } else {
            const err = new Error('Unauthorized');
            err.title = 'Unauthorized';
            err.errors = ['Unauthorized'];
            err.status = 401;
            return next(err);
          }
        })
      );