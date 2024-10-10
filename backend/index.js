const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const authRouter = require("./routers/auth.router");
const db = require("./models/index");
const role = db.Role;
const frontend_url = process.env.FRONT_URL;
const corsOption = {
  origin: frontend_url,
};

db.sequelize.sync({ force: false }).then(() => {
  initRole();
  console.log("Drop and re-sync db.");
});

const initRole = () => {
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
};

console.log(frontend_url);
//List of stores
const stores = require("./stores");
console.log(stores);
const app = express();
app.use(cors(corsOption));
app.get("/api/stores", (req, res) => {
  res.json(stores);
});

//use Middleware
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//user Router
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to API for server Store Deliverry Zone Checker</h1>");
});
app.listen(PORT, () => {
  console.log("server running on port http://localhost:" + PORT);
});
