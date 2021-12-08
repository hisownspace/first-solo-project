'use strict';
const faker = require('faker');
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
          email: faker.internet.email(),
          username: 'JohnDoe',
          firstName: 'John',
          lastName: 'Doe',
          owner: true,
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          email: faker.internet.email(),
          username: 'default-owner',
          firstName: 'Default',
          lastName: 'Owner',
          owner: true,
          hashedPassword: bcrypt.hashSync('owner')
        },
        {
          email: 'hisownspace@gmail.com',
          username: 'hisownspace',
          firstName: 'David',
          lastName: 'Nash',
          owner: false,
          hashedPassword: bcrypt.hashSync(faker.internet.password())
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
      username: { [Op.in]: ['Demo-lition', 'JohnDoe', 'hisownspace'] }
    }, {});
  }
};
