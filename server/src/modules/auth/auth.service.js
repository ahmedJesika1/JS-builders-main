/* eslint-disable no-undef */
const { NotFoundError, UnauthorizedError } = require("../../utils/errors.js");
const AuthRepository = require("./auth.repository.js");
const crypto = require("crypto");
const Email = require("../../utils/Email.js");
const signToken = require("../../utils/signToken.js");
const {
  emailUserName,
  emailPassword,
  emailHost,
  emailPort,
  brandName,
} = require("../../config/config.js");
const nodemailer = require("nodemailer"); // Ensure nodemailer is imported

class AuthService {
  static async signup(userData) {
    const user = await AuthRepository.createUser(userData);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = Date.now() + 10 * 24 * 60 * 60 * 1000;
    await AuthRepository.updateUser(user);

    const url = `http://agroinfusion.com/verify?token=${verificationToken}`;
    await new Email(user, url).sendWelcome();

    return { token: signToken(user._id), user };
  }

  static async verifyUser(token) {
    const user = await AuthRepository.findUserByVerificationToken(token);
    if (!user) throw new NotFoundError("Invalid or expired token provided");

    user.verified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await AuthRepository.updateUser(user);
    return user;
  }

  static async login(emailOrPhone, password) {
    const user = await AuthRepository.findUserByEmailOrPhone(emailOrPhone);
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new UnauthorizedError("Incorrect email/phone or password");
    }
    return { token: signToken(user._id), user };
  }

  static async forgotPassword(email) {
    const user = await AuthRepository.findUserByEmail(email);
    if (!user) throw new NotFoundError("No user found with that email address");
    console.log(user, "user from forget pass----------");

    // Generate password reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash the token before storing it
    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes

    await AuthRepository.updateUser(user);

    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    console.log(resetURL);

    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: true,
      auth: {
        user: emailUserName,
        pass: emailPassword,
      },
      tls: { rejectUnauthorized: false },
    });

    const mailOptions = {
      to: user.email,
      from: emailUserName,
      subject: "Password Reset Request",
      text: `Hello ${user.name},
    
    We received a request to reset your password for your ${brandName} account. If you made this request, please click the link below to reset your password:
    
    ${resetURL}
    
    If the above link doesn’t work, you can also copy and paste this URL into your browser.
    
    If you didn’t request a password reset, you can safely ignore this email. Your account remains secure.
    
    Best regards,  
    The ${brandName} Team`,
      html: `<p>Hello <strong>${user.name}</strong>,</p>
    
      <p>We received a request to reset your password for your <strong>${brandName}</strong> account. If you made this request, please click the button below to reset your password:</p>
    
      <p style="text-align: center;">
        <a href="${resetURL}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Your Password</a>
      </p>
    
      <p>If the button above doesn’t work, you can also copy and paste this link into your browser:</p>
      <p><a href="${resetURL}">${resetURL}</a></p>
    
      <p>If you didn't request a password reset, you can safely ignore this email. Your account remains secure.</p>
    
      <p>Best regards,</p>
      <p><strong>The ${brandName} Team</strong></p>`,
    };

    await transporter.sendMail(mailOptions);
  }

  static async resetPassword(token, password, confirmPassword) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    console.log(hashedToken, "hashed token from reset pass-------");

    // Find user with valid reset token
    const user = await AuthRepository.findUserByResetToken(hashedToken);
    if (!user) throw new NotFoundError("Token is invalid or has expired");

    // Ensure passwords match
    if (password !== confirmPassword) {
      throw new UnauthorizedError("Passwords do not match");
    }

    // Set new password and clear reset token fields
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await AuthRepository.updateUser(user);
  }

  static async updatePassword(
    userId,
    currentPassword,
    newPassword,
    confirmPassword
  ) {
    const user = await AuthRepository.findUserById(userId);
    if (!user) throw new NotFoundError("User not found");

    const isMatched = await user.correctPassword(
      currentPassword,
      user.password
    );
    if (!isMatched)
      throw new UnauthorizedError("Your current password is wrong");

    user.password = newPassword;
    user.confirmPassword = confirmPassword;
    await AuthRepository.updateUser(user);
  }
}

module.exports = AuthService;
