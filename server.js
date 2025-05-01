const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("colors");

const app = require("./app");

// database connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);

  app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
  });
}

// server
const port = process.env.PORT || 8080;
