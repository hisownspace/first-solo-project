'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users',
      [
        {
          email: 'demo@user.io',
          username: 'Demo-User',
          firstName: 'Demo',
          lastName: 'User',
          owner: false,
          hashedPassword: bcrypt.hashSync('password')
        },
        {
          email: "john@doe.com",
          username: 'JohnDoe',
          firstName: 'John',
          lastName: 'Doe',
          owner: false,
          hashedPassword: bcrypt.hashSync('passowrd')
        },
        {
          email: 'default-owner@room-share.com',
          username: 'default-owner',
          firstName: 'Default',
          lastName: 'Owner',
          owner: true,
          hashedPassword: bcrypt.hashSync('owner')
        },
        {
          email: 'roomrenter@gmail.com',
          username: 'roomrenter',
          firstName: 'Room',
          lastName: 'Renter',
          owner: true,
          hashedPassword: bcrypt.hashSync('renter')
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-User', 'JohnDoe', 'roomrenter', 'default-owner'] }
    }, {});
  }
};
