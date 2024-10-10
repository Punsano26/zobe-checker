const { DataTypes, DataType } = require("sequelize");
const sequelize = require("./db");

const Store = sequelize.define("store", {
  storeID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  storeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deliveryRadius: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
Store.sync({ force: false })
  .then(() => {
    console.log("Table Created or already exists");
  })
  .catch((err) => {
    console.log("Error creating table:", err);
  });
module.exports = Store;
