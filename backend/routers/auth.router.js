const express = require("express");
const router = express.Router(); //เรียกออกมาเป็นฟังก์ชันด้วยนะ!!
const authController = require("../controllers/auth.controller");
const { verifySignUp } = require("../middlewares");

//ใส่ middleware
router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

//create a auth
//POST http://localhost:5000/api/v1/auth/register
router.post(
  "/register",
  // [verifySignUp.checkDublicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  authController.register
);

//http://localhost:5000/api/v1/auth/login
router.post("/login", authController.login);

module.exports = router;
