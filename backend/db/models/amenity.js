"use strict";
module.exports = (sequelize, DataTypes) => {
  const Amenity = sequelize.define(
    "Amenity",
    {
      roomId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      icon: DataTypes.STRING,
    },
    {},
  );
  Amenity.associate = function (models) {
    // associations can be defined here
    Amenity.belongsTo(models.Room, { foreignKey: "roomId" });
  };
  return Amenity;
};
