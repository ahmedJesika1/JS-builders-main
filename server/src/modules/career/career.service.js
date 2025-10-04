const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const careerRepository = require("./career.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");

class CareerService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createCareer(payload) {
    const careerData = await this.#repository.createCareer(payload);
    return careerData;
  }

  async getAllCareer() {
    return await this.#repository.findAll({}, [], {}, { createdAt: 1 });
  }

  async getCareerWithPagination(payload) {
    const career = await this.#repository.getCareerWithPagination(payload);
    return career;
  }

  async getSingleCareer(id) {
    const careerData = await this.#repository.findById(id);
    if (!careerData) throw new NotFoundError("Career Not Find");
    return careerData;
  }

  async updateCareer(id, payload) {
    const careerData = await this.#repository.updateById(id, payload);
    if (!careerData) throw new NotFoundError("Career Not Find");
    return careerData;
  }

  async deleteCareer(id) {
    const career = await this.#repository.findById(id);
    if (!career) throw new NotFoundError("Career not found");
    const deletedCareer = await this.#repository.deleteById(id);
    if (deletedCareer) {
      await removeUploadFile(career?.image);
    }
    return deletedCareer;
  }
}

module.exports = new CareerService(careerRepository, "career");
