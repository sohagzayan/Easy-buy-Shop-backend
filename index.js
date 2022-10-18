const colors = require("colors");
const connectionDb = require("./connection/connectionDB");
const dotenv = require("dotenv").config();
const app = require("./app");

/** Database connection */
connectionDb();

/** Server  */
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on ${port}`.blue);
});
