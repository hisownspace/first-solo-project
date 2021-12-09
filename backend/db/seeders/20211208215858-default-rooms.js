'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Rooms', [
     {createdAt: new Date(), updatedAt: new Date(), ownerId: 3, title: 'Summer Fun', description: 'This is one cool house. stay for as long as you want', address: '123 Oak St', city: 'Mechanicsville', state: 'California', zip: '12345', amenities: 'pool, full kitchen, microwave, private bathroom', country: 'Spain', imageUrl: 'https://img.staticmb.com/mbcontent/images/uploads/2021/7/one-hyde-park-penthouse-uk.jpg'},
     {createdAt: new Date(), updatedAt: new Date(), ownerId: 2, title: 'Animal House', description: 'Dogs welcome!', address: '3423 Pinehouse St', city: 'Springville', state: 'State', zip: '12345', amenities: 'pool, full kitchen, microwave, private bathroom', country: 'USA', imageUrl: 'https://img.staticmb.com/mbcontent/images/uploads/2021/7/versailles-florida-us.jpg'},
     {createdAt: new Date(), updatedAt: new Date(), ownerId: 3, title: 'Winter Fun', description: "I'm lonely. I could use the company", address: '8876 Poorhouse St', city: 'Caputington', state: 'State', zip: '94534', amenities: 'pool, full kitchen, live in wait staff, private bathroom', country: 'India', imageUrl: 'https://photos.zillowstatic.com/fp/400e500f7c83872b1135ce8b381a1167-cc_ft_768.webp'},
     {createdAt: new Date(), updatedAt: new Date(), ownerId: 2, title: 'Spring Fun', description: 'Chill house for chill people.', address: '34 Spark St', city: 'Welshire', state: 'State', zip: '34324', amenities: 'pool, full kitchen, microwave, private bathroom', country: 'Scotland', imageUrl: 'https://img.staticmb.com/mbcontent/images/uploads/2021/7/south-coogee-australia.jpg'},
     {createdAt: new Date(), updatedAt: new Date(), ownerId: 3, title: 'Fancy House', description: 'Come stay in our fancy house', address: '344 Bergamot Ln', city: 'Hamlet', state: 'Wyoming', zip: '12345', amenities: 'pool, full kitchen, microwave, private bathroom', country: 'USA', imageUrl: 'https://a0.muscache.com/im/pictures/a28a6ed5-7f45-48d4-be08-90519655037c.jpg?im_w=960'},
     {createdAt: new Date(), updatedAt: new Date(), ownerId: 2, title: 'Perfectly safe house', description: 'The owners are definitely NOT cannibals. Come on by!', address: '123 Cherry Hill Rd', city: 'Springville', state: 'State', zip: '12345', amenities: 'pool, full kitchen, private concert venue, 16 bathrooms', country: 'Russia', imageUrl: 'https://a0.muscache.com/im/pictures/4b834325-a9f7-40e4-8fdf-e15ac2e700fc.jpg?im_w=960'},
     {createdAt: new Date(), updatedAt: new Date(), ownerId: 3, title: 'Has seen better days', description: 'Stay for free if you can help us fix it up.', address: '123 Smock Ave', city: 'Springville', state: 'Bliss', zip: '12345', amenities: 'pool, full kitchen, central air, private bathroom', country: 'USA', imageUrl: 'https://www.monolithic.org/vault/img/2011/05/10/4dc92b6dc29e0684730009c1/medium/house4.jpg'},
     {createdAt: new Date(), updatedAt: new Date(), ownerId: 2, title: 'Scary house', description: 'Come on. I dare you.', address: '1 Dark St', city: 'Las Gorditas', state: 'Disrepair', zip: '432423', amenities: 'outdoor bathroom', country: 'Mexico', imageUrl: 'https://i1.wp.com/www.sellingsmyrnatn.com/wp-content/uploads/2018/03/ugly-house.jpeg?resize=1110%2C740&ssl=1'},
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Rooms', null, {});
  }
};
