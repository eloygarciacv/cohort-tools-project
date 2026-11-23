const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/cohort-tools-api";

mongoose
  .connect(MONGO_URI)
  .then((response) => {console.log("all good, connected to the DB")})
  .catch((error) => {console.error(error)});
