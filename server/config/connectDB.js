const mongoose = require("mongoose");
const url = process.env.MONGO_CONNECTION_URL;

async function connectDb() {
  try {
    await mongoose.connect(url);
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDb;
