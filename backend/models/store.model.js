const { DataTypes, DataType } = require("sequelize");
const sequelize = require("./db");

const Store = sequelize.define("store", {
  storeID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  adminId: {
    type: DataTypes.INTEGER,
    references: {
      model: "user_stores",
      key: "id",
      allowNull: true,
    },
  },
  storeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lat: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  lng: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  deliveryRadius: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Store;
