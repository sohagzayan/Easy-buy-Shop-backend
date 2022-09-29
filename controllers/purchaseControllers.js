const Purchase = require("../models/purchaseSchema");
const Payment = require("../models/paymentDetails");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/* Purses add */
exports.addPurchase = async (req, res) => {
  try {
    const newPurchase = await Purchase(req.body);
    await newPurchase.save();
    res.send(newPurchase);
  } catch (error) {
    res.send(error.message);
  }
};

/* get all Parses post */

exports.getAllPurchase = async (req, res) => {
  const { email } = req.query;
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

exports.getSingleParson = async (req, res) => {
  const id = req.params.id;
  console.log("come is");
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
      console.log(id);
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
    res.status(200).json(deleted);
  } catch (error) {
    res.send(error);
  }
};
