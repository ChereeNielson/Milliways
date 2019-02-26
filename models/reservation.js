module.exports = function(sequelize, DataTypes) {
  var Reservation = sequelize.define("Reservation", {
    name: {
      type: DataTypes.STRING,
      isNull: false
    },
    email: {
      type: DataTypes.STRING,
      isNull: false,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      isNull: false
    }
  });
  return Reservation;
};
