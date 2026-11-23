const { expressjwt } = require("express-jwt");

const verifyToken = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
});

function isAuthenticated(req, res, next) {
  verifyToken(req, res, (error) => {
    if (error) {
      const message =
        error.code === "credentials_required"
          ? "Authentication token required"
          : "Invalid or expired token";

      return res.status(401).json({ message });
    }

    next();
  });
}

module.exports = isAuthenticated;
