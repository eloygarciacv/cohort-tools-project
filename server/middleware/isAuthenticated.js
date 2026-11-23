const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization && authorization.match(/^Bearer (\S+)$/i);

  if (!token) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  try {
    req.payload = jwt.verify(token[1], process.env.JWT_SECRET, { algorithms: ["HS256"] });
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = isAuthenticated;
