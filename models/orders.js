/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var Orders = sequelize.define("Orders", {
    item_ordered: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }
  });
  Orders.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Orders.belongsTo(models.Tables, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Orders;
};
