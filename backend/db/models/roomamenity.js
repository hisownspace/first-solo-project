"use strict";
module.exports = (sequelize, DataTypes) => {
  const RoomAmenity = sequelize.define(
    "RoomAmenity",
    {
      amenityId: DataTypes.INTEGER,
      roomId: DataTypes.INTEGER,

    },
    { timestamps: false, createdAt: false, updatedAt: false },
    {},
  );
  RoomAmenity.associate = function (models) {
    // associations can be defined here
    RoomAmenity.belongsTo(models.Room, { foreignKey: "roomId" });
    RoomAmenity.belongsTo(models.Amenity, { foreignKey: "amenityId" });
  };
  return RoomAmenity;
};
