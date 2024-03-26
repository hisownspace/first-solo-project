"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "RoomAmenities",
      {
        amenity_id: {
          type: Sequelize.INTEGER,
        },
        room_id: {
          type: Sequelize.INTEGER,
        },
      },
      { timestamps: false, createdAt: false, updatedAt: false },
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("RoomAmenities");
  },
};
