'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rentals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      renterId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      roomId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      guests: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      checkIn: {
        allowNull: false,
        type: Sequelize.DATE
      },
      checkOut: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Rentals');
  }
};