"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "RoomAmenities",
      {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
        amenityId: {
          type: Sequelize.INTEGER,
        },
        roomId: {
          type: Sequelize.INTEGER,
        },
      },
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("RoomAmenities");
  },
};
