const sequelize = require("./db");
const Sequelize = require("sequelize");
const User = require("./user.model");
const Role = require("./role.model");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Role = Role;
//Assosiation
db.User.belongsToMany(db.Role, { through: "user_role" }); //สร้างตารางตรงกลางชื่อ user_role
db.Role.belongsToMany(db.User, { through: "user_role" });
module.exports = db;
