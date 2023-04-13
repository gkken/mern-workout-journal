const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({ error: "Authorization token required" });

  const [bearer, token] = authorization.split(" ");

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById({ _id: id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
