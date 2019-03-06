/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var Tables = sequelize.define("Tables", {
    table_number: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  Tables.associate = function(models) {
    Tables.hasMany(models.Orders, {
      onDelete: "cascade"
    });
  };
  return Tables;
};
