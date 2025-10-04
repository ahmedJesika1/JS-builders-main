const BaseService = require("../base/base.service.js");
const userRepository = require("../../../src/modules/user/user.repository.js");
const { NotFoundError } = require("../../utils/errors.js");

class UserService extends BaseService {
  #repository;
  constructor(repository) {
    super(repository, "user");
    this.#repository = repository;
  }

  async createUser(payload) {
    const user = await this.#repository.createUser(payload);
    return user;
  }

  async getAllUsers(filter) {
    return await this.#repository.getAllUsers(filter);
  }

  async getUserById(id) {
    const user = await this.#repository.getUserById(id);
    if (!user) throw new NotFoundError("User not found");
    return user;
  }

  async updateUser(id, payload) {
    const updatedUser = await this.#repository.updateUser(id, payload);
    if (!updatedUser) throw new NotFoundError("User not found");
    return updatedUser;
  }

  async deleteUser(id) {
    const deletedUser = await this.#repository.deleteUser(id);
    if (!deletedUser) throw new NotFoundError("User not found");
    return deletedUser;
  }
}

module.exports = new UserService(userRepository);
