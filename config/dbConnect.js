const mongoose = require("mongoose");

const dbConnect = () => {
  try {
    const connect = mongoose.connect(`${process.env.CONNECTION_URL}`);
    console.log(`Db connection successful`);
    mongoose.connection.on("error", (err) => {
      console.log(err);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
