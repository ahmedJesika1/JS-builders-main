const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const AuthService = require("./auth.service.js");

class AuthController {
  signup = withTransaction(async (req, res, next, session) => {    
    
    const user = await AuthService.signup(req.body, session);
    const resDoc = responseHandler(201, "User registered successfully", user);
    res.status(resDoc.statusCode).json(resDoc);
  });

  verifyUser = catchError(async (req, res) => {
    const { token } = req.query;
    const result = await AuthService.verifyUser(token);
    const resDoc = responseHandler(200, "Email verified successfully", result);
    res.status(resDoc.statusCode).json(resDoc);
  });

  login = catchError(async (req, res) => {
    const { emailOrPhone, password } = req.body;
    console.log(emailOrPhone, password);
    
    const result = await AuthService.login(emailOrPhone, password);
    const resDoc = responseHandler(200, "Login successful", result);
    res.status(resDoc.statusCode).json(resDoc);
  });

  forgotPassword = catchError(async (req, res) => {
    const { email } = req.body;
    await AuthService.forgotPassword(email);
    const resDoc = responseHandler(200, "Password reset email sent");
    res.status(resDoc.statusCode).json(resDoc);
  });

  resetPassword = catchError(async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
    await AuthService.resetPassword(token, password, confirmPassword);
    const resDoc = responseHandler(200, "Password reset successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });

  updatePassword = catchError(async (req, res) => {
    const { currentPassword, password, confirmPassword } = req.body;
    const userId = req.user.id;
    await AuthService.updatePassword(
      userId,
      currentPassword,
      password,
      confirmPassword
    );
    const resDoc = responseHandler(200, "Password updated successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new AuthController();
