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
          title: "Mountain lake home-Stunning view! Hot tub/Fire pit",
          description: "Love life on the lake, hunting, biking, hiking or just relaxing away from home? Bella Vista Raystown Lake has it all! You will love the stunning, unparalleled views of the lake, the mountains and the valleys. Completely renovated in 2021! Just 5 Minutes away from Shy Beaver boat launch & our boat parking for our guests! Newly decorated & furnished with new, bright, modern, classy, relaxing lake-style decor. We have something for everyone! Sleeps 24 new beds! 10% off full week stays!",
          cost: 199,
          address: "515 Lake St",
          city: "James Creek",
          state: "PA",
          zip: "16657",
          // amenities: "pool, full kitchen, microwave, private bathroom",
          country: "USA",
          // imageUrl:
          //   "https://img.staticmb.com/mbcontent/images/uploads/2021/7/one-hyde-park-penthouse-uk.jpg",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 3,
          title: "Tequila Sunset, Harper's Ferry",
description: "Welcome to Tequila Sunset in Harpers Ferry, WV! \n\n\
You have found the perfect place to unwind! \n\n\
This beautiful, custom home has the most stunning sunset views, you will truly feel on top of the world. \n\n\
Entire first floor is yours, no shared spaces! \n\n\
Over 1200 SF of room to unplug & relax. \n\n\
King size Nectar bed, cozy wood burning fireplace, outdoor firepit, electric fireplace, and a private deck with 100 mile views! \n\n\
Just a couple miles from the Mountain Lake Club beach & restaurant & Appalachian Trail.",
          cost: 199,
          address: "1745 Main St",
          city: "Harper's Ferry",
          state: "WV",
          zip: "25425",
          // amenities: "pool, full kitchen, microwave, private bathroom",
          country: "USA",
          // imageUrl:
          //   "https://img.staticmb.com/mbcontent/images/uploads/2021/7/one-hyde-park-penthouse-uk.jpg",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 3,
          title: "Stunning Riverfront Home w/ Pool, Hot Tub & Kayaks",
          description: "This property sits on the edge of a bluff overlooking the Potomac River and boasts stunning views, both from within and around the home, perfect for bird watching (eagles/osprey), fishing or just relaxing and soaking in nature, just minutes from DC!\n\n\
The pool and spa are CLOSED until MEMORIAL DAY 2024.",
          cost: 300,
          address: "560 Penstock Drive",
          city: "Stafford",
          state: "VA",
          zip: "22555",
          // amenities: "pool, full kitchen, live in wait staff, private bathroom",
          country: "USA",
          // imageUrl:
          //   "https://photos.zillowstatic.com/fp/400e500f7c83872b1135ce8b381a1167-cc_ft_768.webp",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "3 Bed Redrock Cave! With Views on Private Ranch",
          description: "This unique 3-bed, 2-bath CAVE offers a blend of rugged comfort & adventure amidst the stunning Moab landscape. Enjoy a prehistoric paradise with handcrafted stone walls & modern amenities. Relax in the spacious living area with redrock mountain views. Full kitchen and dine with friends & family. Rest peacefully in serene bedrooms & witness breathtaking sunsets from the cliff-top patio. Explore nearby canyons, & visit the National Parks. Experience the magic of Moab!",
          cost: 830,
          address: "150 Carter Street",
          city: "Moab",
          state: "UT",
          zip: "84532",
          amenities: "pool, full kitchen, microwave, private bathroom",
          country: "USA",
          // imageUrl:
          //   "https://img.staticmb.com/mbcontent/images/uploads/2021/7/south-coogee-australia.jpg",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 3,
          title: "Tara Oasis: Ultimate Family Escape w pool & tennis",
          description: "Escape to our luxurious retreat where every detail is designed for your ultimate comfort and relaxation. Relax in the screened-in porch or around the fire pit, take a dip in the heated pool, or unwind in the hot tub. Inside, enjoy the open floor plan, tastefully decorated and amenity filled, including a dedicated study. Let the kids play in the backyard oasis with a swing set while you relax in the hammock. With an electric car charger available, your eco-conscious getaway is complete.",
          cost: 463,
          address: "10538 Rock Run Dr",
          city: "Potomac",
          state: "MD",
          zip: "20854",
          amenities: "pool, full kitchen, microwave, private bathroom",
          country: "USA",
          // imageUrl:
          //   "https://a0.muscache.com/im/pictures/23be904d-ba59-4814-91b5-b23f82481421.jpg?im_w=1200",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 3,
          title: "Casa Pablo - Premium Villa",
          description: "On the heights of the French-speaking Caribbean island, St. Barts, Pablo Villa is a subtle mix of luxury and nature. In the heart of a tropical setting, you will enjoy a dreamy exterior with views of the Grand Cul-de-Sac Lagoon.",
          cost: 1822,
          address: "Baie de Grand Cul de Sac",
          city: "Saint-Barthelemy",
          state: "St. Barthelemy",
          zip: "97133",
          // amenities: "pool, full kitchen, microwave, private bathroom",
          country: "St. Barthelemy",
          // imageUrl:
          //   "https://img.staticmb.com/mbcontent/images/uploads/2021/7/one-hyde-park-penthouse-uk.jpg",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 3,
          title: 'Cherry Treesort "Big Nick"',
          description: "This tree house is very unique. It features two separate sleeping quarters to give renters the ability to accommodate more friends and enjoy time together but also have private time at night. Its 25 feet up in the trees and has plenty of nature coming through and around the decks. Its also has all the amenities one would want for comfort in the main house with heat/ AC, TV, Shower, and Toilet. The bunk house also has TV/DVD, heat and AC. Come enjoy nature at its best.",
          cost: 99,
          address: "5601 West Crocus Drive",
          city: "China Grove",
          state: "NC",
          zip: "28023",
          amenities: "pool, full kitchen, central air, private bathroom",
          country: "USA",
          // imageUrl:
          //   "https://www.monolithic.org/vault/img/2011/05/10/4dc92b6dc29e0684730009c1/medium/house4.jpg",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "BALIAN TREEHOUSE w beautiful pool",
          description: "The Balian treehouse is only a 3 minute walk away from the beach. From the veranda you can watch the sunrise in the morning, and enjoy the view of our beautiful garden (900m2) with pool.",
          cost: 101,
          address: "Balian Beach",
          city: "Bali",
          state: "Indonesia",
          zip: "82162",
          amenities: "outdoor bathroom",
          country: "Indonesia",
          // imageUrl:
          //   "https://i1.wp.com/www.sellingsmyrnatn.com/wp-content/uploads/2018/03/ugly-house.jpeg",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "Treehouse De Valentine",
          description: "Nature and rustic luxury in one self-contained space best describes Treehouse de Valentine. Unconventional for the right reasons, this dream house is the perfect nest away from the hustle and bustle of Cebu City.\n\n\
Dine and rest in the heart of nature – bathe in your own wooden bathtub, finish an overdue read by the balcony, or relax on the most comfortable king-sized beds in this 3-bedroom abode. If your soul warrants it, go for a swim in the perpetually cold waters of your own little river!",
          cost: 260,
          address: "Treehouse De Valentine",
          city: "Balamban",
          state: "Philippines",
          zip: "6000",
          // amenities: "outdoor bathroom",
          country: "Phillippines",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "Yellow Submarine",
          description: 'NO CLEANING FEE\n\
Ticked off your bucket list, but still need more?\n\
1960\'s: All aboard for the magical mystery tour with the Beatles and their Yellow Submarine, powered by love; because that\'s what makes the world go round\n\
Cold War superpower scenario: "Hunt for Red October"puts you in charge of nuclear mutually assured destruction,will soviet or US flinch first?\n\
1943 North Atlantic: you are unterseeboot commander happy hunting stricken conveys with torpedo\'s, then oops..depth charges,blind panic",\n',
          cost: 149,
          address: "379 Onepuhi Road",
          city: "Marton",
          state: "Manawatu-Wanganui",
          zip: "6000",
          // amenities: "outdoor bathroom",
          country: "New Zealand",
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
