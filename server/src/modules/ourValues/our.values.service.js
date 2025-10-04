const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const ourValuesRepository = require("./our.values.repository.js");

class OurValuesService extends BaseService {
  #repository;

  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createOurValues(payload, session) {
    console.log(session);
    return await this.#repository.createOurValues(payload);
  }

  async getAllOurValues() {
    return await this.#repository.findAll();
  }

  async getOurValuesWithPagination(payload) {
    return await this.#repository.getOurValuesWithPagination(payload);
  }

  async getSingleOurValues(id) {
    const ourValuesData = await this.#repository.findById(id);
    if (!ourValuesData) throw new NotFoundError("OurValues not found");
    return ourValuesData;
  }

  async updateOurValues(id, payload) {
    const updatedData = await this.#repository.updateById(id, payload);
    if (!updatedData) throw new NotFoundError("OurValues not found");
    return updatedData;
  }

  async deleteOurValues(id) {
    const exists = await this.#repository.findById(id);
    if (!exists) throw new NotFoundError("OurValues not found");
    return await this.#repository.deleteById(id);
  }
}

module.exports = new OurValuesService(ourValuesRepository, "ourValues");
