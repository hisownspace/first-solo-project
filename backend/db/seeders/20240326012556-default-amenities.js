"use strict";

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
    return queryInterface.bulkInsert(
      "Amenities",
      [
        {
          name: "Pool",
          icon: "https://www.iconpacks.net/icons/2/free-swimming-pool-icon-2711-thumb.png",
        },
        {
          name: "Full Kitchen",
          icon: "https://static.vecteezy.com/system/resources/thumbnails/006/689/881/small/kitchen-icon-illustration-free-vector.jpg",
        },
        {
          name: "Microwave",
          icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCtgOJHUbHjql519YIuTR6VbNB_ozDSZBS6l0ku32fSw&s",
        },
        {
          name: "Private Bathroom",
          icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJGIoluGepV9c-H9siS5b4zljUNfFlwE9RdgPhZKUouA&s",
        },
        {
          name: "Live-In Wait Staff",
          icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdW88OSD9QBSXHKDbpVedZ8T3d4elr4z8KY5KVZ8vWTg&s",
        },
        {
          name: "Private Concert Venue",
          icon: "https://media.istockphoto.com/id/1284429063/vector/stage-concert-icon.jpg?s=612x612&w=0&k=20&c=sMBLgRIgtDd35iTZztkJDzlXzykyy--RC1JECEgX_k4=",
        },
        {
          name: "Central Air",
          icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyDKHJYw4XwcxykPQldpOjXtFeXlSEQ1oehV74qMYKDA&s",
        },
        {
          name: "Outdoor Bathroom",
          icon: "https://static.thenounproject.com/png/77782-200.png",
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Amenities", null, {});
  },
};
