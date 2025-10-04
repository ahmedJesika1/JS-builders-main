const { UserSchema } = require("../../models/index.js");
const BaseRepository = require("../base/base.repository.js");
// const crypto = require("crypto");

class AuthRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createUser(userData) {
    console.log(userData);
    
    return await this.#model.create(userData);
  }

  async updateUser(user) {
    return await user.save({ validateBeforeSave: false });
  }

  async findUserById(id) {
    return await this.#model.findById(id).select("+password");
  }

  async findUserByEmailOrPhone(emailOrPhone) {
    return await this.#model
      .findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] })
      .select("+password");
  }

  async findUserByEmail(email) {
    return await this.#model.findOne({ email });
  }

  async findUserByVerificationToken(token) {
    return await this.#model.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gte: Date.now() },
    });
  }

  async findUserByResetToken(token) {
    // const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    return await this.#model.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });
  }
}

module.exports = new AuthRepository(UserSchema);
