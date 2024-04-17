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
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "Muskoka Waterfront w/ Hot tub (Silver Linings)",
          description: '*No extra fees* Come enjoy our designer furnished, newly-built, 4-season, Silver Lining Muskoka Lakehouse. This cottage offers you and your loved ones the perfect getaway with tons to do and memories to make with Insta sunsets over a lake wrapping around the entire property, a sandy beach to dip your toes, hot tub to warm up with friends, fire pit for roasting marshmallows. Other amenities: fully stocked kitchen, treehouse, games, BBQ, 1 acre of privacy, pet bed, well maintained hot tub.',
          cost: 302,
          address: "1581A Lake Joseph Rd",
          city: "Parry Sound",
          state: "Ontario",
          zip: "P2A 2W8",
          // amenities: "outdoor bathroom",
          country: "Canada",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "Panoramic View Villa in OliveGroves",
          description: "Relax under the bright Mediterranean sun, enjoy the magnificent Cretan landscape as well as a fantastic sea-view from this amazing villa, built at the foothill of mythical mount Ida amidst olive groves and sheep farms, in a quiet secluded village.",
          cost: 85,
          address: "Olive Groves",
          city: "Loutraki",
          state: "Crete",
          zip: "203 00",
          // amenities: "outdoor bathroom",
          country: "Greece",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "The Cove | Beach House (Upper)",
          description: "Escape to serenity with the soothing sounds of waves and the elegant ballet of boats, a legacy crafted by our family's mariner ancestors in the late 19th century. Nestled less than 10 steps from the water, the house rests in perfect harmony with nature and provides an ideal spot to unwind and relax. Eco-friendly and freshly renovated in 2022. What sets us apart is our commitment to annual maintenance, ensuring a perpetually refreshed haven. Explore the timeless allure of coastal living with us!",
          cost: 491,
          address: "The Cove",
          city: "Fourkovouni",
          state: "Milos",
          zip: "848 00",
          // amenities: "outdoor bathroom",
          country: "Greece",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "Clark Farm Silos #2 - Incredible Mountain Views",
          description: "Reset and rejuvenate at the Clark Farm Silos! Our thoughtfully designed, unique metal structures are equipped with a fully functional kitchenette, private bathroom and spacious loft bedroom with gorgeous mountain views. Start your days sipping coffee while drinking in the fresh mountain air. Relax after a day of adventure under the starry sky next to the crackling sounds of your personal campfire. Centrally located so you can enjoy all that the Flathead Valley has to offer.",
          cost: 124,
          address: "Clark Farm",
          city: "Kalispell",
          state: "Montana",
          zip: "59901",
          // amenities: "outdoor bathroom",
          country: "USA",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "Cozy, unique & stylish next to lake and mountains",
          description: "The perfect place for those seeking peace and quiet and lovers of nature and beautiful spaces. This exclusive apartment is located on the top floor of a completely renovated detached farmhouse.\n\
Hiking or skiing … shopping or sightseeing in Lucerne or Interlaken ... or simply enjoy the lake in its shimmering colors. The house is surrounded by countless opportunities to discover Central Switzerland. The place for a break, vacation or the perfect honeymoon.",
          cost: 219,
          address: "Lake Lungern",
          city: "Bürglen",
          state: "Obwalden",
          zip: "6078",
          // amenities: "outdoor bathroom",
          country: "Switzerland",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "New modern house with unreal view of Lone Peak!!",
          description: "Featured as one of RoomShare's most wish-listed ski homes! Breathtaking view of Lone Peak. Stacking windows that open to the deck with hot tub, grill and slide for the kids! Pure oxygen pumped into two main bedrooms. Indoor and outdoor fireplace. Pure oxygen piped into two main bedrooms! Open floor plan with 25' vaulted ceilings. Custom bunk beds. 1 mile drive to Big Sky parking lot and .3 mile ski/walk down to White Otter 2 lift from house (can't ski back). We have a 2022 RZR 4XP Pro for rent.",
          cost: 532,
          address: "Big Sky Mountain Village",
          city: "Big Sky",
          state: "Montana",
          zip: "59716",
          // amenities: "outdoor bathroom",
          country: "USA",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "The End Place - A romantic hideaway for two",
          description: "The End Place is a self-contained cottage adjoining Moorhouse Cottage B&B. Downstairs is open plan, comprising a fully equipped kitchen and a living area with wood burning stove. A glass wall ensures uninterrupted views across Nidderdale Area of Outstanding Natural Beauty, as well as starry-night skyscapes. Upstairs opens out into a magical, fairy-lit, vaulted bedroom with a king size brass bed adorned with crisp linen and includes en suite with shower.",
          cost: 104,
          address: "Moorhouse Cottage",
          city: "Bewerley",
          state: "England",
          zip: "HG3 5JF",
          // amenities: "outdoor bathroom",
          country: "United Kingdom",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "Beautiful Bedroom in West LA Architectural Gem",
          description: "• Bedroom is located in our home's back wing. (It's not above the shared living room.)\n\
• 200 sq. ft. private bedroom with backyard garden view.\n\
• King-size bed & luxury linens.\n\
• Wi-Fi.\n\
• Adjacent private bathroom with rain shower.\n\
• Designed by architect Neil Denari, our home has been featured in The NY Times, Los Angeles Magazine, & Vogue.\n\
• We're located in West LA -- near freeway exits, public transportation, & LAX.\n\
• We're nearby everywhere you'll want to visit in LA.",
          cost: 175,
          address: "Palms Blvd",
          city: "Los Angeles",
          state: "California",
          zip: "90034",
          // amenities: "outdoor bathroom",
          country: "USA",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "Seaside Adventure at Laguna Shores Resort",
          description: "We have 2 beautiful places in Rocky Point, Mexico in the private and gated community of Laguna Shores. It is close to the local art and culture, great views, in site restaurants and dining, the beach, and family-friendly activities. You’ll love my place because of the kitchen, the high ceilings, the comfy bed, the light, and the coziness. My place is good for couples, business travelers, families (with kids), and big groups.",
          cost: 355,
          address: "Laguna Shores Resort",
          city: "Laguna Shores",
          state: "Sonora",
          zip: "83550",
          // amenities: "outdoor bathroom",
          country: "Mexico",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "Oceanfront | Dog Friendly | Game Room | Hot Tub",
          description: "Welcome to Indigo by Everwild Retreats, a gorgeous home along the sandy shores of the Pacific Ocean. This modern, beautifully-decorated home features 5 comfy bedrooms, a designer kitchen, a sunroom facing the ocean, a game room, a hot tub, and more, making this the perfect place for a relaxing beach getaway for the whole family or group of friends.",
          cost: 935,
          address: "Everwild Retreats",
          city: "Westport",
          state: "Washington",
          zip: "98595",
          // amenities: "outdoor bathroom",
          country: "United States",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "Big Idyllic family lake house with private dock",
          description: "Cosy, old and authentic lake house in the woods with private dock and amazing sunsets. The house is big and is perfect for several families a group of friends or several generations.\n\n\
Enjoy an amazing escape in the beautiful nature only 2,2 hours from Copenhagen. With the forrest as backdrop and facing the big lake the location is as perfect as it gets. Go for a swim from the private dock, take our boat or our two canoes to explore the many secluded island.",
          cost: 913,
          address: "Strömsborg",
          city: "Tingsryd SV",
          state: "Kronobergs län",
          zip: "362 30",
          // amenities: "outdoor bathroom",
          country: "Sweden",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "Villa Kanalia Mykonos Summer House",
          description: "Villa Kanalia is situated in Kanalia in Mykonos. It overlooks the City of Mykonos and the island of Tinos.\n\n\
Amazing views from within the house and guestrooms as well as from the outside space and pool.\n\
Every room has been decorated with great love and all have their own en-suite bathroom.\n\
Please note a simple rental agreement is required by Greek law. We will ask you to review this prior to booking.\n\n\
Please note that wifi is only available in the main building.",
          cost: 1062,
          address: "Villa Kanalia",
          city: "Mikonos",
          state: "Egeo",
          zip: "385 00",
          // amenities: "outdoor bathroom",
          country: "Greece",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "Lost&Found Galactic Friends' House",
          description: "We travel the endless corridors of our mind until one day we find a pathway that leads us to our heart.\n\
So here at Lost & Found we invite you to a journey into your heart and soul by being one with nature.\n\
Reconnect to yourself and enjoy the healing environment of the holy mountains of Parvati Valley.\n\
Come, be a part of our galactic Friends' House and feel and fill all your senses.",
          cost: 10,
          address: "Kalgha Village",
          city: "Sosan",
          state: "Himachal Pradesh",
          zip: "175105",
          // amenities: "outdoor bathroom",
          country: "India",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "Monbazillac suite, with private terrace",
          description: "The Monbazillac suite takes you high in the tranquility of Rauly Castle. Enjoy its private terrace with panoramic views overlooking the gardens of the castle.\n\
Comfort is at the rendezvous with a king size bed and a living room ideal for relaxing.\n\n\
5 kilometers from Bergerac located in the heart of Monbazillac in the middle of a 5 hectare park with a beautiful swimming pool , in a very quiet setting.\n\
Château Rauly dates from the 19th century Napoleon 3",
          cost: 127,
          address: "Rauly Castle",
          city: "Monbazillac",
          state: "Nouvelle-Aquitaine",
          zip: "24240",
          // amenities: "outdoor bathroom",
          country: "France",
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 2,
          title: "Cabin at Green Mountain",
          description: "Cabin at Green Mountain is located near Nemo, a tiny mountain town set in the picturesque valley of Boxelder Creek midway between Rapid City, Hill City, Sturgis and Deadwood, South Dakota. The convenient location allows you to visit top tourist attractions while enjoying a special haven of rest and relaxation.",
          cost: 200,
          address: "22418 Jim Creek Lane",
          city: "Deadwood",
          state: "South Dakota",
          zip: "57732",
          // amenities: "outdoor bathroom",
          country: "United States",
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
