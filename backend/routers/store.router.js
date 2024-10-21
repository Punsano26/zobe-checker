const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store.controller");

//create a new Store 
//POST http://localhost:5000/api/v1/stores
router.post("/create", storeController.create);

//Get all Store
router.get("/getAll", storeController.getAll);

//Get By ID
router.get("/getById/:id", storeController.getById);

//Update a Store
router.put("/update/:id", storeController.update);

//Delete a Store
router.delete("/deleteById/:id", storeController.deleteById);

module.exports = router;