
const { UserSchema } = require("../../models/index.js");
const BaseRepository = require("../base/base.repository.js");

class UserRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createUser(payload) {
    return await this.#model.create(payload);
  }

  async getAllUsers(filter = {}) {
    return await this.#model.find(filter).sort({ createdAt: -1 });
  }

  async getUserById(id) {
    return await this.#model.findById(id);
  }

  async updateUser(id, payload) {
    return await this.#model.findByIdAndUpdate(id, payload, { new: true });
  }

  async deleteUser(id) {
    return await this.#model.findByIdAndDelete(id);
  }

  async getUserByEmail(email) {
    return await this.#model.findOne({ email });
  }
}

module.exports = new UserRepository(UserSchema);
