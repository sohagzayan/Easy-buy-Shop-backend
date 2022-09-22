/* External import */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
/* Internal import */
const User = require("../models/UserSchema");
const SendEmail = require("../EmailSend/NodeMailer");
const PendingUser = require("../models/PendingUserSchema");

exports.unShiptUser = async (req, res) => {
  try {
    const email = req.params.email;
    const user = req.body;
    const filter = { email: email };
    const options = { upsert: true };
    const updateDoc = {
      $set: user,
    };
    const result = await User.updateOne(filter, updateDoc, options);
    const token = await jwt.sign({ email: email }, process.env.ACCESS_TOKEN, {
      expiresIn: "7d",
    });
    res.status(200).json({ result, token });
  } catch (error) {
    res.send(error);
  }
};

/* Create or Signup a new account Account  */
exports.createNewUser = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    console.log(req.body);
    const newUser = await PendingUser({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      bio: req.body.bio,
      personalSite: req.body.personalSite,
      AccountAccess: req.body.AccountAccess,
      socialAccount: req.body.socialAccount,
      password: hashPassword,
      role: req.body.role,
      education: req.body.education,
      country: req.body.country,
      city: req.body.city,
      linkeDin: req.body.linkeDin,
      image: req.body.image,
    });
    await newUser.save();
    const url = `${process.env.BASE_URL}api/v1/user/signin/${newUser._id}`;
    await SendEmail(newUser.email, "verify Email address", url);
    res.status(200).json({
      status: "success",
      message: "User SignUp Successfully Completed",
      user: newUser,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

/** Verify User Email with Nodemailer  */
exports.verifyUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userValid = await PendingUser.find({ _id: id }).select(
      "-_id  -createdAt  -updatedAt -__v"
    );
    const verifyUser = await User({
      name: userValid[0].name,
      username: userValid[0].username,
      email: userValid[0].email,
      bio: userValid[0].bio,
      personalSite: userValid[0].personalSite,
      socialAccount: userValid[0].socialAccount,
      AccountAccess: userValid[0].AccountAccess,
      socialAccount: userValid[0].socialAccount,
      password: userValid[0].password,
      role: userValid[0].role,
      education: userValid[0].education,
      country: userValid[0].country,
      city: userValid[0].city,
      linkeDin: userValid[0].linkeDin,
      image: userValid[0].image,
    });
    await verifyUser.save();
    await PendingUser.deleteOne({ _id: id });
    res.status(200).json({ message: "Verification successful !" });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

/* Login user Account  */
exports.loginUser = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.find({ email: email });
  const isPending = await PendingUser.find({ email: email });
  if (!isPending.length > 0) {
    if (user && user.length > 0) {
      const isPasswordValid = await bcrypt.compare(password, user[0].password);
      if (isPasswordValid) {
        const token = jwt.sign(
          { userEmail: user[0].email, userId: user[0]._id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.status(200).json({
          Access_Token: token,
          userId: user[0]._id,
          message: "Login successful",
        });
      } else {
        next("Authentication filed");
      }
    } else {
      console.log("i am alse inner");
      return next("This User Not Valid");
    }
  } else {
    const url = `${process.env.BASE_URL}api/user/verifyuser/${user?._id}`;
    await SendEmail(email, "verify Email address", url);
    next("Pleace Verify Your Account then again try to login");
  }
};

/** Current User  */
exports.currentUser = async (req, res) => {
  const { id } = req.params;
  try {
    const currentuser = await User.find({ _id: id });
    res.status(200).json({ status: "success", currentuser: currentuser });
  } catch (error) {
    res.status(404).json({ error: "User Not Found" });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const allUser = await User.find().populate();
    res.send(allUser);
  } catch (error) {
    res.send(error);
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const allUser = await User.findByIdAndDelete(id);
    res.send(allUser);
  } catch (error) {
    res.send(error);
  }
};

exports.getSingleUser = async (req, res) => {
  const email = req.params.email;
  try {
    const allUser = await User.find({ email: email });
    res.send(allUser);
  } catch (error) {
    res.send(error);
  }
};

exports.userUpdate = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body);
    res.send("Successfully updated user");
  } catch (error) {
    res.send(error);
  }
};
