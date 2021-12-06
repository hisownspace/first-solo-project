'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User, { foreignKey: 'userId' });
    Review.belongsTo(models.Room, { foreignKey: 'roomId' });

  };
  return Review;
};