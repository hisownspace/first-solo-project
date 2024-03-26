"use strict";
module.exports = (sequelize, DataTypes) => {
  const RoomAmenity = sequelize.define(
    "RoomAmenity",
    {
      amenity_id: DataTypes.INTEGER,
      room_id: DataTypes.INTEGER,
    },
    {},
  );
  RoomAmenity.associate = function (models) {
    // associations can be defined here
    RoomAmenity.belongsTo(models.Room, { foreignKey: "roomId" });
    RoomAmenity.belongsTo(models.Amenity, { foreignKey: "amenityId" });
  };
  return RoomAmenity;
};
