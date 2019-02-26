module.exports = function(sequelize, DataTypes) {
  var Reservation = sequelize.define("Reservation", {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      },
      phone: DataTypes.STRING
    }
  });
  return Reservation;
};
