"use strict";
module.exports = (sequelize, DataTypes) => {
  const RoomImage = sequelize.define(
    "RoomImage",
    {
      roomId: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
    },
    {},
  );
  RoomImage.associate = function (models) {
    // associations can be defined here
    RoomImage.belongsTo(models.Room, { foreignKey: "roomId" });
  };
  return RoomImage;
};
