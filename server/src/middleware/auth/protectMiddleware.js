/* eslint-disable no-undef */
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { UserSchema } = require("../../models");

const protectMiddleware = async (req, res, next) => {
  // 1) Getting the token if it's there
  const auth = req.headers.authorization;
  let token;

  if (auth && auth.startsWith("Bearer")) {
    token = auth.split(" ")[1];
  }

  if (!token) {
    return next(
      new Error("You are not logged in, Please login to get access!", 401)
    );
  }

  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if the user still exists
  const currentUser = await UserSchema.findById(decoded.id);

  if (!currentUser) {
    return next(
      new Error("The user belonging to the token does no longer exist!", 401)
    );
  }

  // 4) Check if user changed the password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new Error(
        "User recently changed the password, Enter the current resources",
        401
      )
    );
  }

  //  GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
};

module.exports = protectMiddleware;
