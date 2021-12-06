'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      imageUrl: {
        allowNull: false,
        type: Sequelize.STRING
      },
      amenities: {
        type: Sequelize.STRING
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Rooms');
  }
};