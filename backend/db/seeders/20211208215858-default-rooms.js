"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Rooms",
      [
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 3,
          title: "Summer Fun",
          description: "This is one cool house. stay for as long as you want",
          address: "1745 T Street Southeast",
          city: "Washington",
          state: "DC",
          zip: "20020",
          amenities: "pool, full kitchen, microwave, private bathroom",
          country: "USA",
          imageUrl:
            "https://img.staticmb.com/mbcontent/images/uploads/2021/7/one-hyde-park-penthouse-uk.jpg",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "Animal House",
          description: "Dogs welcome!",
          address: "6007 Applegate Lane",
          city: "Louisville",
          state: "KY",
          zip: "40219",
          amenities: "pool, full kitchen, microwave, private bathroom",
          country: "USA",
          imageUrl:
            "https://img.staticmb.com/mbcontent/images/uploads/2021/7/versailles-florida-us.jpg",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 3,
          title: "Winter Fun",
          description: "I'm lonely. I could use the company",
          address: "560 Penstock Drive",
          city: "Grass Valley",
          state: "CA",
          zip: "95945",
          amenities: "pool, full kitchen, live in wait staff, private bathroom",
          country: "USA",
          imageUrl:
            "https://photos.zillowstatic.com/fp/400e500f7c83872b1135ce8b381a1167-cc_ft_768.webp",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "Spring Fun",
          description: "Chill house for chill people.",
          address: "150 Carter Street",
          city: "Manchester",
          state: "CT",
          zip: "06040",
          amenities: "pool, full kitchen, microwave, private bathroom",
          country: "USA",
          imageUrl:
            "https://img.staticmb.com/mbcontent/images/uploads/2021/7/south-coogee-australia.jpg",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 3,
          title: "Fancy House",
          description: "Come stay in our fancy house",
          address: "2721 Lindsay Avenue",
          city: "Louisville",
          state: "KY",
          zip: "40206",
          amenities: "pool, full kitchen, microwave, private bathroom",
          country: "USA",
          imageUrl:
            "https://a0.muscache.com/im/pictures/23be904d-ba59-4814-91b5-b23f82481421.jpg?im_w=1200",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "Perfectly safe house",
          description: "The owners are definitely NOT cannibals. Come on by!",
          address: "18 Densmore Drive",
          city: "Vallejo",
          state: "CA",
          zip: "94591",
          amenities: "pool, full kitchen, private concert venue, 16 bathrooms",
          country: "USA",
          imageUrl:
            "https://a0.muscache.com/im/pictures/4b834325-a9f7-40e4-8fdf-e15ac2e700fc.jpg",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 3,
          title: "Has seen better days",
          description: "Stay for free if you can help us fix it up.",
          address: "5601 West Crocus Drive",
          city: "Glendale",
          state: "AZ",
          zip: "85306",
          amenities: "pool, full kitchen, central air, private bathroom",
          country: "USA",
          imageUrl:
            "https://www.monolithic.org/vault/img/2011/05/10/4dc92b6dc29e0684730009c1/medium/house4.jpg",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "Scary house",
          description: "Come on. I dare you.",
          address: "5403 Illinois Avenue",
          city: "Nashville",
          state: "TN",
          zip: "37209",
          amenities: "outdoor bathroom",
          country: "USA",
          imageUrl:
            "https://i1.wp.com/www.sellingsmyrnatn.com/wp-content/uploads/2018/03/ugly-house.jpeg",
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Rooms", null, {});
  },
};
