'use strict';

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
      "RoomImages",
[
{ roomId: 1, imageUrl: "/api/rooms/images/01-33a12247-320f-423f-9f7c-92d06a96cad6.webp" },
{ roomId: 1, imageUrl: "/api/rooms/images/02-6e73ff43-0023-432d-8ae1-15efdfb7a2ae.webp" },
{ roomId: 1, imageUrl: "/api/rooms/images/03-c8a842aa-5e2c-4329-94b2-211213d97e1b.webp" },
{ roomId: 1, imageUrl: "/api/rooms/images/04-753ccfc0-b6eb-4c7f-b6a2-686afe73acf4.webp" },
{ roomId: 1, imageUrl: "/api/rooms/images/05-00edb569-70c4-4009-aa5f-1e5fddf1cad7.webp" },
{ roomId: 10, imageUrl: "/api/rooms/images/01-0be3f493-fd2d-434e-b557-ad2c189b1543.webp" },
{ roomId: 10, imageUrl: "/api/rooms/images/02-54a54b14-9c99-4b06-a89b-a825c73879d7.webp" },
{ roomId: 10, imageUrl: "/api/rooms/images/03-8005cfbd-4f7f-4e48-95a8-6c31c8861655.webp" },
{ roomId: 10, imageUrl: "/api/rooms/images/04-052ac320-b872-45f5-be91-15c76cdbccab.webp" },
{ roomId: 10, imageUrl: "/api/rooms/images/05-cfdf38c5-f9c0-4d45-bdaf-c7fdfa0953e5.webp" },
{ roomId: 11, imageUrl: "/api/rooms/images/01-d70ee82c-4dcf-4a75-adb8-5476455cab22.webp" },
{ roomId: 11, imageUrl: "/api/rooms/images/02-9565547f-c1c5-4ec8-8b60-771477616c87.webp" },
{ roomId: 11, imageUrl: "/api/rooms/images/03-b203fd72-dc44-475d-a09a-9147b372fd11.webp" },
{ roomId: 11, imageUrl: "/api/rooms/images/04-768f47b9-e494-4a2b-99be-1adc9ee4d3e3.webp" },
{ roomId: 11, imageUrl: "/api/rooms/images/05-83aceb0c-079d-4a5f-b73a-df9b97b46a9b.webp" },
{ roomId: 12, imageUrl: "/api/rooms/images/01-c8c8324d-2799-42f2-a8d1-7bfa0cdff0a1.webp" },
{ roomId: 12, imageUrl: "/api/rooms/images/02-86c3493e-5018-4e2d-95eb-22104969e7cf.webp" },
{ roomId: 12, imageUrl: "/api/rooms/images/03-d117fa2c-1e39-4e62-bfb1-980b16217ab3.webp" },
{ roomId: 12, imageUrl: "/api/rooms/images/04-11224ec9-9a27-4fc2-acf6-931843c420d7.webp" },
{ roomId: 12, imageUrl: "/api/rooms/images/05-94da52b7-7de5-4cd9-9473-ecb41597482a.webp" },
{ roomId: 13, imageUrl: "/api/rooms/images/01-736c8ea3-1950-492e-9eaa-9ea2a084253b.webp" },
{ roomId: 13, imageUrl: "/api/rooms/images/02-697134c3-2cb4-4995-a057-06c11b5c8194.webp" },
{ roomId: 13, imageUrl: "/api/rooms/images/03-964a6bef-e231-41cb-bd5d-310b78dc163f.webp" },
{ roomId: 13, imageUrl: "/api/rooms/images/04-c8cc4346-7c1c-4750-a4d0-249f0558054d.webp" },
{ roomId: 13, imageUrl: "/api/rooms/images/05-dea2b2c7-fcde-4810-b50e-ee6de248d0d8.webp" },
{ roomId: 14, imageUrl: "/api/rooms/images/01-51823946-35a4-45d1-a2ca-fcf19d1cc20d.webp" },
{ roomId: 14, imageUrl: "/api/rooms/images/02-1be7cc9f-6544-4901-913d-936542aa5363.webp" },
{ roomId: 14, imageUrl: "/api/rooms/images/03-86d123fd-6e60-4163-9680-4dee1f732243.webp" },
{ roomId: 14, imageUrl: "/api/rooms/images/04-f0ffe4a3-5ec5-4246-8537-77319a6eb65e.webp" },
{ roomId: 14, imageUrl: "/api/rooms/images/05-ecd7f049-f41f-4327-852b-d65fa0459698.webp" },
{ roomId: 15, imageUrl: "/api/rooms/images/01-c29ab3c1-0675-4270-822f-3fc7f89212d7.webp" },
{ roomId: 15, imageUrl: "/api/rooms/images/02-9f5065be-8ea2-4c11-a37d-03fe45975d16.webp" },
{ roomId: 15, imageUrl: "/api/rooms/images/03-6c3170a9-cb35-44c3-9145-049287e02c11.webp" },
{ roomId: 15, imageUrl: "/api/rooms/images/04-38b9b91b-8a45-445f-85ce-a34cd410275c.webp" },
{ roomId: 15, imageUrl: "/api/rooms/images/05-336dfed0-9daa-4b63-9541-3337b1c2b8fd.webp" },
{ roomId: 16, imageUrl: "/api/rooms/images/01-c0f8aa73-ac5c-4736-8940-e0c3da1a4e36.webp" },
{ roomId: 16, imageUrl: "/api/rooms/images/02-b7cfd9ce-3325-4720-bd96-5a509e2fe1e7.webp" },
{ roomId: 16, imageUrl: "/api/rooms/images/03-bf5fdaca-5568-4f29-b620-1357b712d8dd.webp" },
{ roomId: 16, imageUrl: "/api/rooms/images/04-d5eb0a70-ab45-42af-a2d4-6268cb518e1a.webp" },
{ roomId: 16, imageUrl: "/api/rooms/images/05-78fd5564-e048-4700-b4b5-7b633c6375f7.webp" },
{ roomId: 17, imageUrl: "/api/rooms/images/01-75e16e63-5e00-4b29-a90e-e1d2f88a64c8.webp" },
{ roomId: 17, imageUrl: "/api/rooms/images/02-07f35ab8-962e-48b7-8467-2e37163e18ed.webp" },
{ roomId: 17, imageUrl: "/api/rooms/images/03-8b1002f6-203e-4705-931e-e26ff33fa94b.webp" },
{ roomId: 17, imageUrl: "/api/rooms/images/04-cab6f695-931f-454a-abae-6d33361346a3.webp" },
{ roomId: 17, imageUrl: "/api/rooms/images/05-1603e639-b733-45ef-9b08-8b69113876ee.webp" },
{ roomId: 18, imageUrl: "/api/rooms/images/01-e9b089e9-5a1a-4135-a597-1166421fc804.webp" },
{ roomId: 18, imageUrl: "/api/rooms/images/02-2903e59d-01f8-4c0d-9d19-e119f0c2d603.webp" },
{ roomId: 18, imageUrl: "/api/rooms/images/03-73eb02df-4c22-4013-966c-22fdff03e2e2.webp" },
{ roomId: 18, imageUrl: "/api/rooms/images/04-c8252478-62de-465e-bdbb-31ef8b32c828.webp" },
{ roomId: 18, imageUrl: "/api/rooms/images/05-1048633b-433d-4359-88bd-28e2c8a3f60f.webp" },
{ roomId: 19, imageUrl: "/api/rooms/images/01-31cc9e91-5978-4345-b3a7-99ad2f672a68.webp" },
{ roomId: 19, imageUrl: "/api/rooms/images/02-f1fa4f30-fd7a-457b-8186-977f6cc2346c.webp" },
{ roomId: 19, imageUrl: "/api/rooms/images/03-c6078724-d25b-4e2c-a62e-e9b59f33f88c.webp" },
{ roomId: 19, imageUrl: "/api/rooms/images/04-db446722-bbcd-44f5-bd16-5da684ea1dc8.webp" },
{ roomId: 19, imageUrl: "/api/rooms/images/05-37b2e1ae-381a-4e20-aca1-5f7a09b3d53a.webp" },
{ roomId: 2, imageUrl: "/api/rooms/images/01-50c3cb59-5b59-4a58-bd86-1997fec4dc6d.webp" },
{ roomId: 2, imageUrl: "/api/rooms/images/02-554d7542-d508-46f5-9782-1ded52b0be52.webp" },
{ roomId: 2, imageUrl: "/api/rooms/images/03-fb61df81-7fe5-4da0-a2f5-e2e09e7c3eef.webp" },
{ roomId: 2, imageUrl: "/api/rooms/images/04-5f992cf4-9339-46aa-a9e8-d32f9a64a45c.webp" },
{ roomId: 2, imageUrl: "/api/rooms/images/05-15575dd3-c4d0-4a0e-8b6d-5e8845c7ce1d.webp" },
{ roomId: 20, imageUrl: "/api/rooms/images/01-3c339b76-04c5-437e-88ba-281df962bbaf.webp" },
{ roomId: 20, imageUrl: "/api/rooms/images/02-06bc692b-5ba2-4613-b72d-f008064bd4ae.webp" },
{ roomId: 20, imageUrl: "/api/rooms/images/03-7fec282c-1db6-47af-b687-71bd9fb06794.webp" },
{ roomId: 20, imageUrl: "/api/rooms/images/04-95c291c5-e6c1-4620-b7a6-b2d6912d3ce5.webp" },
{ roomId: 20, imageUrl: "/api/rooms/images/05-b1609596-1720-4113-9bda-4b651ed0ab8f.webp" },
{ roomId: 21, imageUrl: "/api/rooms/images/01-f2f013e9-df52-4b77-a42f-a5b88d4846ce.webp" },
{ roomId: 21, imageUrl: "/api/rooms/images/02-1b0875d8-2aef-4868-bed6-2f18a6426dc8.webp" },
{ roomId: 21, imageUrl: "/api/rooms/images/03-0d3829a4-a4ea-4b41-8c3d-5aaf487922e6.webp" },
{ roomId: 21, imageUrl: "/api/rooms/images/04-cfcbee10-a4eb-4332-a2f2-a8bed97d8a6e.webp" },
{ roomId: 21, imageUrl: "/api/rooms/images/05-8775c008-ba4d-4dee-9fdc-e8e578adc11c.webp" },
{ roomId: 22, imageUrl: "/api/rooms/images/01-252c31c9-cb01-432a-99ba-b113d686f52c.webp" },
{ roomId: 22, imageUrl: "/api/rooms/images/02-bf3b96ad-2d87-44ee-aa78-5ba6bc5bb8b9.webp" },
{ roomId: 22, imageUrl: "/api/rooms/images/03-bd5d9f0f-4ae8-4a2f-a243-6ea051ffe2a8.webp" },
{ roomId: 22, imageUrl: "/api/rooms/images/04-45efb83b-6485-495a-9039-8babc5a0781e.webp" },
{ roomId: 22, imageUrl: "/api/rooms/images/05-309ba966-2f8d-445f-ac1e-91813c50b0ef.webp" },
{ roomId: 23, imageUrl: "/api/rooms/images/01-df870fce-648f-4f4e-add1-d49c5aa90181.webp" },
{ roomId: 23, imageUrl: "/api/rooms/images/02-183329c4-8735-47d6-8462-a426494cdf69.webp" },
{ roomId: 23, imageUrl: "/api/rooms/images/03-b9b6d359-3654-4f28-b3fa-23cdb42d701d.webp" },
{ roomId: 23, imageUrl: "/api/rooms/images/04-2c44b843-22bc-4fd7-9367-ef9d59cae52a.webp" },
{ roomId: 23, imageUrl: "/api/rooms/images/05-649b5006-9aa0-4ddd-bb0f-a7e1c46c778c.webp" },
{ roomId: 24, imageUrl: "/api/rooms/images/01-cf8b9f69-2494-40af-9b77-a51efb961053.webp" },
{ roomId: 24, imageUrl: "/api/rooms/images/02-376246a2-7bf9-4024-bdec-8e47a75a31be.webp" },
{ roomId: 24, imageUrl: "/api/rooms/images/03-2cc36f39-2d03-4dd2-9225-857239f66400.webp" },
{ roomId: 24, imageUrl: "/api/rooms/images/04-0ca3f11f-98dc-4fdb-839a-e6b30dbc5858.webp" },
{ roomId: 24, imageUrl: "/api/rooms/images/05-b3f737dd-87ef-4ed2-83c9-d09df1b8a5dd.webp" },
{ roomId: 25, imageUrl: "/api/rooms/images/01-146fcc0f_original.webp" },
{ roomId: 25, imageUrl: "/api/rooms/images/02-057347df_original.webp" },
{ roomId: 25, imageUrl: "/api/rooms/images/03-79e352aa_original.webp" },
{ roomId: 25, imageUrl: "/api/rooms/images/04-9dd01968_original.webp" },
{ roomId: 25, imageUrl: "/api/rooms/images/05-bab13203_original.webp" },
{ roomId: 3, imageUrl: "/api/rooms/images/01-b6e8e524-ea9e-4326-8041-720a6d24878e.webp" },
{ roomId: 3, imageUrl: "/api/rooms/images/02-019ad85b-2a77-416f-846e-819d97c95187.webp" },
{ roomId: 3, imageUrl: "/api/rooms/images/03-7bc5afbd-95d1-4e35-915c-ac4898155dd2.webp" },
{ roomId: 3, imageUrl: "/api/rooms/images/04-e9e72dba-32ba-42ae-836c-257a8ed808fe.webp" },
{ roomId: 3, imageUrl: "/api/rooms/images/05-2355ab2a-05ec-411d-9ada-474613635c77.webp" },
{ roomId: 4, imageUrl: "/api/rooms/images/01-6135624d-9fda-4ec5-ad1a-6cf74cd30c25.webp" },
{ roomId: 4, imageUrl: "/api/rooms/images/02-b44eeb34-6767-456a-92fe-e9f00e063305.webp" },
{ roomId: 4, imageUrl: "/api/rooms/images/03-6bb8e98b-cd15-4643-b917-fe6aef14df40.webp" },
{ roomId: 4, imageUrl: "/api/rooms/images/04-2c3df41d-cf8b-49bc-9a57-0c2eb1afd0a7.webp" },
{ roomId: 4, imageUrl: "/api/rooms/images/05-d2d90783-5cf9-49b5-b81d-c341faac3878.webp" },
{ roomId: 5, imageUrl: "/api/rooms/images/01-f8fd39b4-81ac-4275-8354-5a4a85841adf.webp" },
{ roomId: 5, imageUrl: "/api/rooms/images/02-f05432e9-1a32-4ad8-aded-04be48b57335.webp" },
{ roomId: 5, imageUrl: "/api/rooms/images/03-9b414dfe-c715-49d8-befb-dd632b727b56.webp" },
{ roomId: 5, imageUrl: "/api/rooms/images/04-75c78496-d300-4aa4-8af1-4e821a177f02.webp" },
{ roomId: 5, imageUrl: "/api/rooms/images/05-76ae907c-29cb-4c18-926f-a311481a09f3.webp" },
{ roomId: 6, imageUrl: "/api/rooms/images/01-c703e575-86f6-4567-aeb0-495373d2a763.webp" },
{ roomId: 6, imageUrl: "/api/rooms/images/02-8440e4d6-5b7a-464a-bf5e-9a00510da709.webp" },
{ roomId: 6, imageUrl: "/api/rooms/images/03-7d710cf5-e6b6-45ed-b435-2145499f1cdd.webp" },
{ roomId: 6, imageUrl: "/api/rooms/images/04-13087643-76ba-4b43-823b-1fbbf7637c4e.webp" },
{ roomId: 6, imageUrl: "/api/rooms/images/05-1c039223-54fa-4ecf-9935-a1f4e7b30c99.webp" },
{ roomId: 7, imageUrl: "/api/rooms/images/01-a8ef5d47-0b5a-4189-abaf-322753e942b2.webp" },
{ roomId: 7, imageUrl: "/api/rooms/images/02-2477d0d5-7d92-43ca-a144-3c934dc57770.webp" },
{ roomId: 7, imageUrl: "/api/rooms/images/03-18d27719-890e-47b4-a3e5-02cf42d4ccca.webp" },
{ roomId: 7, imageUrl: "/api/rooms/images/04-3abdf2bd-7b15-43bd-8e0a-7815660a8636.webp" },
{ roomId: 7, imageUrl: "/api/rooms/images/05-5e6b7729-7a0a-4a9a-99a4-2edff94e879a.webp" },
{ roomId: 8, imageUrl: "/api/rooms/images/01-7cc3c855-f90e-4d0f-9b13-3b5c2a3c4bad.webp" },
{ roomId: 8, imageUrl: "/api/rooms/images/02-5e249106-66d9-4638-99aa-6b8fc38f3203.webp" },
{ roomId: 8, imageUrl: "/api/rooms/images/03-0b25f6b3-f215-4938-ac81-581eb3929047.webp" },
{ roomId: 8, imageUrl: "/api/rooms/images/04-9833de62-35b7-41f2-8a24-0d9354150ea7.webp" },
{ roomId: 8, imageUrl: "/api/rooms/images/05-de73abc2-5dc9-4962-ba32-5d28211cdde0.webp" },
{ roomId: 9, imageUrl: "/api/rooms/images/01-03b6cb80-e1a3-43c6-8a7a-a04e7205caa5.webp" },
{ roomId: 9, imageUrl: "/api/rooms/images/02-ef9cd0cb-aac1-41d1-b46f-9184a610f92e.webp" },
{ roomId: 9, imageUrl: "/api/rooms/images/03-6b132777-3c7a-4007-83cb-477de0a136d6.webp" },
{ roomId: 9, imageUrl: "/api/rooms/images/04-b133420b-e520-426a-ba44-0949dc2ab4ba.webp" },
{ roomId: 9, imageUrl: "/api/rooms/images/05-31bda3ee-5bfa-4b7a-87c4-615928e1d4b9.webp" },
],
      {},
    )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("RoomImages", null, {});
  }
};