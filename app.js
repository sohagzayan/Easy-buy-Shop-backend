/** External Require */
const createError = require("http-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

/** Internal Require */
const userLoginRoute = require("./routes/user.login");
const userSigninRoute = require("./routes/user.signin");
const userRoute = require("./routes/user.route");
const toolsRoutes = require("./routes/tools.route");
const reviewsRoutes = require("./routes/review.route");
const purchaseRoutes = require("./routes/purchase.route");
const paymetnRoutes = require("./routes/payment.route");
const bookmarkRoute = require("./routes/bookmarkRoute.route");
const addToCardRoute = require("./routes/addToCard.route");
const addShopReview = require("./routes/add_Shop_review_route");
const {
  NotFindRouteHandaler,
  globalErrorHandaler,
} = require("./middlWare/ErrorHandaling.middlewere");
const port = process.env.PORT || 5000;

/* meddleWere */
const corsOptions = {
  origin: "https://easy-buy-shop.vercel.app",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello word");
});

/* User Route */
app.use("/api/v1/user/login", userLoginRoute);
app.use("/api/v1/user/signin", userSigninRoute);
app.use("/api/v1/user/user", userRoute);
/** Tools Route */
app.use("/api/v1/tools", toolsRoutes);
/** Reviews Routes */
app.use("/api/v1/review", reviewsRoutes);
/** Purchase Routes */
app.use("/api/v1/purchase", purchaseRoutes);
/** Payment Routes */
app.use("/api/v1/payment", paymetnRoutes);
/** Bookmark  Routes */
app.use("/api/v1/bookmark", bookmarkRoute);
app.use("/api/v1/addToCard", addToCardRoute);
/** Shop Review */
app.use("/api/v1/shopReview", addShopReview);
/** Not Find Routing */
app.use(NotFindRouteHandaler);
/** Global Error Handler */
app.use(globalErrorHandaler);

module.exports = app;
