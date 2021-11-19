const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let decoded = jwt.verify(req.cookies.session, process.env.JWT_SECRET);
    if (decoded.status !== 9) return res.status(401).json({ error: new Error("Unauthorized") });
    next();
  } catch {
    res.status(401).json({ error: new Error("Invalid token!") });
  }
};