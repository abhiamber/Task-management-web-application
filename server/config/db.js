const mongoose = require("mongoose");
require("dotenv").config()

let connect = () => {
  return mongoose.connect(process.env.DB_URL);
};
module.exports = connect;
