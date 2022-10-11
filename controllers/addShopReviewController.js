const ShopReview = require("../models/addShopReviewSchema");

exports.addShopReview = async (req, res, next) => {
  const { id } = req.params;
  try {
    const review = await ShopReview({
      rating: req.body.rating,
      heading: req.body.heading,
      message: req.body.message,
      user: id,
    });
    await review.save();
    res.send("Review Send Succesfull");
  } catch (error) {
    next(error.message);
  }
};

exports.getShopReview = async (req, res, next) => {
  try {
    const review = await ShopReview.find({}).populate("user");
    res.send(review);
  } catch (error) {
    next(error.message);
  }
};

exports.deleteShopReview = () => {};
