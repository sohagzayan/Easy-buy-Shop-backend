const Tools = require("../models/toolsSchema");

/* add tools */
exports.AddTools = async (req, res) => {
  const { userId } = req.decoded;
  try {
    const newTools = await Tools(req.body);
    await newTools.save();
    await User.updateOne(
      {
        _id: userId,
      },
      {
        $push: {
          tools: newTools._id,
        },
      }
    );
    res.send(newTools);
  } catch (error) {
    res.send(error.message);
  }
};

/* get all tools */
exports.getAllTools = async (req, res) => {
  const { userId } = req.decoded;
  console.log(userId);
  const { limit } = req.query;
  try {
    const allTools = await Tools.find().limit(limit);
    res.send(allTools);
  } catch (error) {
    res.send(error.message);
  }
};

/* get single products use id */
exports.getSingleProducts = async (req, res) => {
  try {
    const getSingleProducts = await Tools.findById(req.params.id);
    res.send(getSingleProducts);
  } catch (error) {
    res.send(error.message);
  }
};

/* Delete Single Tools */
exports.deleteSingleProducts = async (req, res) => {
  try {
    const getSingleProducts = await Tools.findByIdAndDelete(req.params.id);
    res.send(getSingleProducts);
  } catch (error) {
    res.send(error.message);
  }
};
