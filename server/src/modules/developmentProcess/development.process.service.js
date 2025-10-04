const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const developmentProcessRepository = require("./development.process.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class DevelopmentProcessService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createDevelopmentProcess(payload, payloadFiles) {
    const { files } = payloadFiles;
    // const { title, description, detail, pdf, quote, honorName, honorDesignation, video

    // } = payload;
    // if (!title ||!details) throw new Error("title and details are required");
    // if (!files) throw new Error("image is required");

    const images = await ImgUploader(files);
    for (const key in images) {
      payload[key] = images[key];
    }

    const developmentProcessData =
      await this.#repository.createDevelopmentProcess(payload);
    return developmentProcessData;
  }

  async getAllDevelopmentProcess() {
    return await this.#repository.findAll({}, [], {}, { createdAt: 1 });
  }

  async getDevelopmentProcessWithPagination(payload) {
    const developmentProcess =
      await this.#repository.getDevelopmentProcessWithPagination(payload);
    return developmentProcess;
  }

  async getSingleDevelopmentProcess(id) {
    const developmentProcessData = await this.#repository.findById(id);
    if (!developmentProcessData)
      throw new NotFoundError("DevelopmentProcess Not Find");
    return developmentProcessData;
  }

  async updateDevelopmentProcess(id, payload, payloadFiles) {
    const { files } = payloadFiles;

    if (files?.length) {
      const images = await ImgUploader(files);
      for (const key in images) {
        payload[key] = images[key];
      }
    }

    const developmentProcessData = await this.#repository.updateById(
      id,
      payload
    );

    if (files.length && developmentProcessData) {
      await removeUploadFile(developmentProcessData?.image);
    }

    if (!developmentProcessData)
      throw new NotFoundError("DevelopmentProcess Not Find");

    return developmentProcessData;
  }

  async deleteDevelopmentProcess(id) {
    const developmentProcess = await this.#repository.findById(id);
    if (!developmentProcess)
      throw new NotFoundError("DevelopmentProcess not found");
    const deletedDevelopmentProcess = await this.#repository.deleteById(id);
    if (deletedDevelopmentProcess) {
      await removeUploadFile(developmentProcess?.image);
    }
    return deletedDevelopmentProcess;
  }
}

module.exports = new DevelopmentProcessService(
  developmentProcessRepository,
  "developmentProcess"
);
