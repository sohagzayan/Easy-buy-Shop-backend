/** External Require */
const createError = require("http-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

/** Internal Require */
const toolsRoute = require("./routes/toolsRoutes");
const purchaseRoute = require("./routes/PurchaseRoute");
const connectionDb = require("./connection/connectionDB");
const userRoutes = require("./routes/userRoutes");
const reviewRoute = require("./routes/reviewRoute");
const adminRoute = require("./routes/adminRoute");
const port = process.env.PORT || 5000;

/* meddleWere */
app.use(cors());
connectionDb();
app.use(express.json());

/* Routes */
app.use("/api/tools", toolsRoute);
app.use("/api/purchase", purchaseRoute);
app.use("/api/user", userRoutes);
app.use("/api/review", reviewRoute);
app.use("/api/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("hello word");
});

/** Global Error Handler */

app.use(async (rew, res, next) => {
  next(createError.NotFound("This Route does not exist"));
});

app.use((err, rew, res, next) => {
  // res.status(500);
  res.status(200).json({
    status: 500,
    message: err,
  });
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
