module.exports = function(sequelize, DataTypes) {
  var Menu = sequelize.define("Menu", {
    name: DataTypes.STRING,
    ingredients: DataTypes.TEXT,
    category: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER
  });
  return Menu;
};
