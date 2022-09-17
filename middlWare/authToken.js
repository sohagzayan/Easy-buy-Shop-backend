/* External import */
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
/* Internal import */

/** Auth Gard */
const authToken = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    decoded;
    req.decoded = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).send({ message: "Forbidden access" });
  }
};

module.exports = authToken;
