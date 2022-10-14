const Tools = require("../models/toolsSchema");
const User = require("../models/UserSchema");

/* add tools */
exports.AddTools = async (req, res, next) => {
  const { userId } = req.decoded;
  try {
    const newTools = await Tools({ ...req.body, users: userId });
    const newToolsProduct = await newTools.save();
    await User.updateOne(
      { _id: userId },
      { $push: { myProduct: newToolsProduct._id } }
    );
    res.send(newTools);
  } catch (error) {
    next(error.message);
  }
};

/* get all tools */
exports.getAllTools = async (req, res) => {
  const { userId } = req.decoded;
  const { size, page, currentUser, limit } = req.query;
  const skipTools = parseInt(page) * parseInt(size);
  const { category, searchKeyword, priceRange, sortedByPrice } = req.body;
  let query = {};
  /** This if condition is bad practice. i'm update this again . this is my sort time solition */
  if (searchKeyword && category && priceRange) {
    query = {
      $text: { $search: searchKeyword },
      category: category,
      price: { $lte: priceRange },
    };
  } else if (searchKeyword && category) {
    query = {
      $text: { $search: searchKeyword },
      category: category,
    };
  } else if (searchKeyword && priceRange) {
    query = {
      $text: { $search: searchKeyword },
      price: { $lte: priceRange },
    };
  } else if (priceRange && category) {
    query = {
      price: { $lte: priceRange },
      category: category,
    };
  } else if (category) {
    query = {
      category: category,
    };
  } else if (searchKeyword) {
    query = {
      $text: { $search: searchKeyword },
    };
  } else if (priceRange) {
    query = {
      price: { $lte: priceRange },
    };
  }

  // console.log("query", parseInt(sortedByPrice));
  let Product = [];
  try {
    const result = await Tools.find(query)
      .populate("users")
      .skip(skipTools)
      .limit(size)
      .sort({ price: parseInt(sortedByPrice) });

    // console.log(result);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
};

exports.getCurrentUserProduct = async (req, res) => {
  const decoded = req.decoded;
  try {
    const CurrentUserData = await Tools.find({
      users: decoded.userId,
    }).populate("users");
    res.send(CurrentUserData);
  } catch (error) {
    next(error.message);
  }
};

exports.getProductSuggested = async (req, res) => {
  const { category, limit } = req.query;
  try {
    const allTools = await Tools.find({ category: category })
      .populate("users")
      .limit(limit);
    res.send(allTools);
    return;
  } catch (error) {
    res.send(error.message);
  }
};

exports.getToolsWithoutAuth = async (req, res) => {
  const { limit } = req.query;
  try {
    const userTools = await Tools.find({}).populate("users").limit(limit);
    res.send(userTools);
  } catch (error) {
    res.send(error.message);
  }
};

exports.getAllToolsAmount = async (req, res) => {
  try {
    const allTools = await Tools.find();
    const count = await allTools.length;
    res.json({ status: "success", tools_count: count });
  } catch (error) {
    res.send(error.message);
  }
};

/* get single products use id */
exports.getSingleProducts = async (req, res) => {
  try {
    const getSingleProducts = await Tools.findByIdAndUpdate({
      _id: req.params.id,
    }).populate("users");
    // getSingleProducts.
    res.send(getSingleProducts);
  } catch (error) {
    res.send(error.message);
  }
};

/* Delete Single Tools */
exports.deleteSingleProducts = async (req, res) => {
  try {
    await Tools.findByIdAndDelete(req.params.id);
    res.send("Remove Product SuccessFull");
  } catch (error) {
    res.send(error.message);
  }
};

/* Delete Single Tools */
exports.updateProducts = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Tools.updateOne({ _id: id }, req.body);
    res.send("SuccessFully Update Product");
  } catch (error) {
    next(error.message);
  }
};
