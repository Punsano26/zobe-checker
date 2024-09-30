const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const frontend_url = process.env.FRONT_URL;
const corsOption = {
  origin: frontend_url,
};
console.log(frontend_url);
//List of stores
const stores = require("./stores");
console.log(stores);
const app = express();
app.use(cors(corsOption));
app.get("/api/stores", (req,res)=> {
    res.json(stores)
})



app.get("/", (req, res) => {
    res.send("<h1>Welcome to API for server Store Deliverry Zone Checker</h1>")
})
app.listen(PORT, () => {
  console.log("server running on port http://localhost:" + PORT);
});