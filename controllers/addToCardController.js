const AddToCard = require("../models/addToCardSchema");
const Tools = require("../models/toolsSchema");
const User = require("../models/UserSchema");

exports.addToCard = async (req, res) => {
  const { id } = req.params;
  const decoded = req.decoded;

  try {
    const isAdded = await AddToCard.find({
      productId: id,
      userId: decoded.userId,
    });
    if (isAdded.length > 0) {
      return res.json({
        status: 500,
        message: "This Products Alredy Add Your Booklist!",
      });
    } else {
      const isAddedProduct = await Tools.findOne({ _id: id }).select({
        date: 0,
        __v: 0,
      });

      const addToCard = await AddToCard({
        name: isAddedProduct.name,
        details: isAddedProduct.details,
        price: isAddedProduct.price,
        minimumOrder: isAddedProduct.minimumOrder,
        quantity: isAddedProduct.quantity,
        discount: isAddedProduct.discount,
        image: isAddedProduct.image,
        productId: isAddedProduct._id,
        userId: decoded.userId,
      });
      const newAddToCard = await addToCard.save();

      return res.json({
        status: "success",
        message: "Success To Added Add To Card !",
      });
    }
  } catch (error) {
    res.send(error.message);
  }
};

exports.getCardProducts = async (req, res) => {
  const decoded = req.decoded;
  try {
    const allCard = await AddToCard.find({ userId: decoded.userId });
    res.send(allCard);
  } catch (error) {
    res.send(error.message);
  }
};

/** Delete Form Card */
exports.deleteFormCard = async (req, res) => {
  const { id } = req.params;
  console.log("delete ");
  try {
    await AddToCard.findByIdAndDelete({ _id: id });
    res.send("SuccessFully Delete Form Card");
  } catch (error) {
    res.send(error.message);
  }
};
