const Bookmark = require("../models/BookMarkSchema");
const Tools = require("../models/toolsSchema");
const User = require("../models/UserSchema");

exports.addBookmark = async (req, res, next) => {
  const { id } = req.params;
  const decoded = req.decoded;
  try {
    const isAdded = await Bookmark.find({
      userId: decoded.userId,
      productId: id,
    });
    console.log(isAdded);
    if (isAdded.length > 0) {
      console.log("alredy added");
      return res.json({
        status: 500,
        message: "This Products Alredy Add Your Booklist!",
      });
    } else {
      const isAddedProduct = await Tools.findOne({ _id: id }).select({
        date: 0,
        __v: 0,
      });

      const bookmark = await Bookmark({
        name: isAddedProduct.name,
        details: isAddedProduct.details,
        price: isAddedProduct.price,
        minimumOrder: isAddedProduct.minimumOrder,
        quantity: isAddedProduct.quantity,
        discount: isAddedProduct.discount,
        image: isAddedProduct.image,
        userId: decoded.userId,
        productId: isAddedProduct._id,
      });
      await bookmark.save();
      return res.json({
        status: "success",
        message: "Success To Added Bookmark !",
      });
    }
  } catch (error) {
    res.send(error.message);
  }
};

exports.getBookmark = async (req, res, next) => {
  const decoded = req.decoded;
  try {
    const allBookmark = await Bookmark.find({ userId: decoded.userId });
    res.send(allBookmark);
  } catch (error) {
    res.send(error.message);
  }
};
