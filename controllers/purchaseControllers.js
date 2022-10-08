const Purchase = require("../models/purchaseSchema");
const Payment = require("../models/paymentDetails");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/UserSchema");
/* Purses add */
exports.addPurchase = async (req, res, next) => {
  const decoded = req.decoded;
  try {
    const newPurchase = await Purchase(req.body);
    const newPerchaseProduct = await newPurchase.save();
    const exits = await User.updateOne(
      { myProduct: { $in: newPerchaseProduct.productIds } },
      { $push: { myProductOrder: newPerchaseProduct._id } }
    );

    res.send({ status: "success", parchesId: newPerchaseProduct._id });
  } catch (error) {
    next(error.message);
  }
};

exports.UpdatePurchaseInfo = async (req, res) => {
  const decoded = req.decoded;
  const { id } = req.params;
  try {
    await Purchase.findByIdAndUpdate({ _id: id }, req.body);
    res.send("Update SuccessFull");
  } catch (error) {
    res.send(error.message);
  }
};

/* get all Parses post */

exports.getAllPurchase = async (req, res) => {
  const { email } = req.query;
  const { ProductId } = req.query;
  const { userEmail } = req.decoded;

  if (email) {
    if (userEmail === email) {
      try {
        const newPurchase = await Purchase.find({ email: email });
        newPurchase;
        res.send(newPurchase);
      } catch (error) {
        res.send(error.message);
      }
    } else {
      return res.send({ message: "Forbidden access" });
    }
  } else {
    try {
      const newPurchase = await Purchase.find();
      res.send(newPurchase);
    } catch (error) {
      res.send(error.message);
    }
  }
};

exports.getAllPurchaseMyProduct = async (req, res) => {
  const decoded = req.decoded;
  try {
    const CurrentUser = await User.findOne({ _id: decoded.userId });
    const myProductPurchase = await Purchase.find({
      _id: { $in: CurrentUser.myProductOrder },
    });
    res.send(myProductPurchase);
  } catch (error) {
    res.send(error.message);
  }
};

exports.alredyBuyProduct = async (req, res) => {
  const { productId } = req.query;
  const { userEmail } = req.decoded;
  try {
    const alredyBuy = await Purchase.find({
      productId: productId,
      email: userEmail,
    });
    res.send(alredyBuy);
  } catch (error) {
    res.send(error.message);
  }
};

exports.getSingleParson = async (req, res) => {
  const id = req.params.id;
  try {
    const newPurchase = await Purchase.findById(id);
    res.send(newPurchase);
  } catch (error) {
    res.send(error.message);
  }
};

exports.paymentIntent =
  ("/",
  async (req, res) => {
    const service = req.body;
    const price = service.price;
    const amount = price * 100;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  });

exports.updatePayedInfo =
  ("/",
  async (req, res) => {
    try {
      const id = req.params.id;
      const payment = req.body;
      const result = await Payment(payment);
      await result.save();
      const updated = await Purchase.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: { payed: payment.payed, transactionId: payment.transactionId },
        },
        { useFindAndModify: true }
      );
      res.send(updated);
    } catch (error) {
      res.send(error);
    }
  });

exports.deletePursesProduct = async (req, res) => {
  try {
    const deleted = await Purchase.findByIdAndDelete(req.params.id);
    res.send("Delete Your Order SuccessFully");
  } catch (error) {
    res.send(error);
  }
};
