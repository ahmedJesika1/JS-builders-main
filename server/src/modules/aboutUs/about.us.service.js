const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const aboutUsRepository = require("./about.us.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class AboutUsService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createAboutUs(payload, payloadFiles, session) {
    const { files } = payloadFiles;
    // const { title, details, mission, vision, value } = payload;
    // if (!title ||!details) throw new Error("title and details are required");
    if (!files) throw new Error("image is required");

    const images = await ImgUploader(files);
    for (const key in images) {
      payload[key] = images[key];
    }

    const deletedAboutUs = await this.#repository.createAboutUs(payload, session);
    return deletedAboutUs;
  }

  async getAllAboutUs() {
    return await this.#repository.findAll();
  }

  async getAboutUsWithPagination(payload) {
    const aboutUs = await this.#repository.getAboutUsWithPagination(payload);
    return aboutUs;
  }

  async getSingleAboutUs(id) {
    const deletedAboutUs = await this.#repository.findById(id);
    if (!deletedAboutUs) throw new NotFoundError("AboutUs Not Find");
    return deletedAboutUs;
  }

  async updateAboutUs(id, payloadFiles, payload) {
    const { files } = payloadFiles;

    if (files?.length) {
      const images = await ImgUploader(files);
      for (const key in images) {
        payload[key] = images[key];
      }
    }

    const deletedAboutUs = await this.#repository.updateById(id, payload);
    if (!deletedAboutUs) throw new NotFoundError("AboutUs Not Find");

    if (files.length && deletedAboutUs) {
      await removeUploadFile(deletedAboutUs.image);
    }
    return deletedAboutUs;
  }

  async deleteAboutUs(id) {
    const aboutUs = await this.#repository.findById(id);
    if (!aboutUs) throw new NotFoundError("AboutUs not found");
    const deletedAboutUs = await this.#repository.deleteById(id);

    if (deletedAboutUs) {
      await removeUploadFile(deletedAboutUs.image);
    }

    return deletedAboutUs;
  }
}

module.exports = new AboutUsService(aboutUsRepository, "aboutUs");
