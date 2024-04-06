'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rental = sequelize.define('Rental', {
    renterId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    guests: DataTypes.INTEGER,
    checkIn: DataTypes.DATE,
    checkOut: DataTypes.DATE
  }, {});
  Rental.associate = function(models) {
    // associations can be defined here
    Rental.belongsTo(models.User, { foreignKey: 'renterId' });
    Rental.belongsTo(models.Room, { foreignKey: 'roomId' });


  };
  return Rental;
};
