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
  try {
    if (size || page) {
      const allTools = await Tools.find()
        .populate("users")
        .skip(skipTools)
        .limit(size);
      res.send(allTools);
      return;
    } else {
      if (currentUser) {
        const userTools = await Tools.find({
          users: currentUser,
        }).populate("users");
        res.send(userTools);
        return;
      }
      const allTools = await Tools.find().populate("users").limit(limit);
      res.send(allTools);
      return;
    }
  } catch (error) {
    res.send(error.message);
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
