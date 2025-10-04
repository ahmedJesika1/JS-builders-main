const { Router } = require("express");
const controller = require("../../modules/auth/auth.controller");
const protectMiddleware = require("../../middleware/auth/protectMiddleware");

const AuthRoute = Router();

AuthRoute.post("/signup", controller.signup);
AuthRoute.get("/verify", controller.verifyUser);
AuthRoute.post("/login", controller.login);
AuthRoute.post("/forgot-password", controller.forgotPassword);
AuthRoute.patch("/reset-password/:token", controller.resetPassword);
AuthRoute.patch(
  "/update-password",
  protectMiddleware,
  controller.updatePassword
);

module.exports = AuthRoute;
