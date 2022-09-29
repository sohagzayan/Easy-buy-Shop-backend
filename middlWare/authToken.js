/* External import */
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
/* Internal import */

/** Auth Gard */
const authToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    try {
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded) {
        req.decoded = decoded;
        next();
      } else {
        next("Forbidden Access");
      }
    } catch (err) {
      next(err.message);
    }
  } else {
    next("Forbidden Accesss");
  }
};

module.exports = authToken;
