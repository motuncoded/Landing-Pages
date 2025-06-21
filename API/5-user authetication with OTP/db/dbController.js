const mongoose = require("mongoose");
// File: db/dbController.js

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
  console.log("Connected to MongoDB");
};
module.exports = connectdb;
// This function connects to MongoDB using Mongoose and logs the connection status.
// If the connection fails, it logs the error and exits the process with a failure status.
