"use strict";
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define(
    "Favorite",
    {
      roomId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    { timestamps: false, createdAt: false, updatedAt: false },
  );
  Favorite.associate = function (models) {
    // associations can be defined here
    Favorite.belongsTo(models.Room, { foreignKey: "roomId" });
    Favorite.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Favorite;
};
