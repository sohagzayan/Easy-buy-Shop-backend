const Review = require("../models/reviewSchema");

exports.postReview = async (req, res) => {
  const decoded = req.decoded;
  try {
    const newPurchase = await Review({ ...req.body, user: decoded.userId });
    await newPurchase.save();
    res.send(newPurchase);
  } catch (error) {
    res.send(error.message);
  }
};

exports.getReview = async (req, res) => {
  const { productId, page, size } = req.query;
  const skipTools = parseInt(page) * parseInt(size);
  try {
    const newPurchase = await Review.find({ productId: productId })
      .populate("user")
      .skip(skipTools)
      .limit(size);
    res.send(newPurchase);
  } catch (error) {
    res.send(error.message);
  }
};

exports.getAllReviewCount = async (req, res) => {
  const { productId } = req.query;
  try {
    const allTools = await Review.find({ productId: productId }).populate(
      "user"
    );
    const count = await allTools.length;
    res.json({ status: "success", tools_count: count });
  } catch (error) {
    res.send(error.message);
  }
};
