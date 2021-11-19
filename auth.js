const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    jwt.verify(req.cookies.session, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: new Error("Invalid token!") });
  }
};