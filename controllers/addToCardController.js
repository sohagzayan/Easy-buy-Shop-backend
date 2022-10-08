const AddToCardProduct = require("../models/addToCardSchema");
const Tools = require("../models/toolsSchema");
const User = require("../models/UserSchema");

exports.addToCard = async (req, res, next) => {
  const { id } = req.params;
  const { quantity, subTotal } = req.body;
  const decoded = req.decoded;
  try {
    const alredyAdded = await User.find({
      _id: decoded.userId,
      card: { $in: id },
    });
    if (alredyAdded.length > 0) {
      next("This Product Already Exits!");
    } else {
      const Product = await Tools.findOne({ _id: id });
      const newProductSave = await AddToCardProduct({
        name: Product.name,
        details: Product.details,
        price: Product.price,
        quantity: quantity,
        subTotal: subTotal,
        discount: Product.discount,
        coupon: Product.coupon,
        image: Product.image,
        users: Product.users,
        productId: Product._id,
      });
      const newProduct = await newProductSave.save();
      await User.findByIdAndUpdate(
        { _id: decoded.userId },
        { $push: { card: newProduct._id } }
      );
      res.send("success to add product form card");
    }
  } catch (error) {
    next(error.message);
  }
};

exports.getCardProducts = async (req, res) => {
  const decoded = req.decoded;
  try {
    const CurrentUser = await User.findOne({ _id: decoded.userId });
    const getUserCardProduct = await AddToCardProduct.find({
      _id: { $in: CurrentUser.card },
    });
    res.send(getUserCardProduct);
  } catch (error) {
    res.send(error.message);
  }
};

exports.updateAddToCardProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await AddToCardProduct.findByIdAndUpdate(
      { _id: id },
      req.body
    );
    res.send("updateUserSuccesfuy");
  } catch (error) {
    res.send(error.message);
  }
};

/** Delete Form Card */
exports.deleteFormCard = async (req, res, next) => {
  const { id } = req.params;
  const decoded = req.decoded;
  const currentUser = await User.findOne({ _id: decoded.userId });
  try {
    if (req.body.removeAll) {
      await User.updateMany({}, { $unset: { card: currentUser.card } });
      await AddToCardProduct.remove({});
      res.send("SuccessFully Delete  all form  Card");
    } else {
      await User.findByIdAndUpdate(
        { _id: decoded.userId },
        { $pull: { card: id } }
      );
      await AddToCardProduct.findByIdAndDelete({ _id: id });
      res.send("SuccessFully Delete Form Card");
    }
  } catch (error) {
    next(error.message);
  }
};
