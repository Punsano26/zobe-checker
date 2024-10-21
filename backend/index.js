const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const storeRouter = require( "./routers/store.router");
const authRouter = require("./routers/auth.router");
const db = require("./models");
const role = db.Role;
const frontend_url = process.env.FRONT_URL;
const corsOption = {
  origin: frontend_url,
};

db.sequelize.sync({ force: true }).then(() => {
  // initRole();
  console.log("Drop and re-sync db.");
});

// existingRole ขึ้นมาสั่งให้่มันรอก่อน เพื่อที่จะสแกนหาด้วยคำสั่ง findAll แล้วก็ทำเงื่อนไขว่า ถ้าค้นหาในroleแล้วมันว่าง ก็สร้างซะ แต่ถ้ามันมันมีอยู่แล้วหรือ ไม่ตรงเงื่อน ===0 ก็ไม่ต้องสร้าง
const initRole = async () => {
  const existingRole = await role.findAll();
  if (existingRole.length === 0) {
    role.create({
      id: 1,
      name: "user",
    });
    role.create({
      id: 2,
      name: "moderator",
    });
    role.create({
      id: 3,
      name: "admin",
    });
    console.log("hello api");
  }
};

console.log(frontend_url);
//List of stores
// const stores = require("./stores");
// console.log(stores);
const app = express();
app.use(cors(corsOption));
app.get("/api/stores", (req, res) => {
  // res.json(stores);
});

//use Middleware
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//user Router
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/stores", storeRouter);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to API for server Store Deliverry Zone Checker</h1>");
});
app.listen(PORT, () => {
  console.log("server running on port http://localhost:" + PORT);
});
