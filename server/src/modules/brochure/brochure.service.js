const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const brochureRepository = require("./brochure.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class BrochureService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createBrochure(payload, session) {
    const { file } = payload;
    if (!file) throw new Error("image is required");

    // ImgUploader expects array
    const images = await ImgUploader([file]);
    for (const key in images) {
      payload[key] = images[key];
    }

    const brochureData = await this.#repository.createBrochure(payload);
    return brochureData;
  }

  async getAllBrochure() {
    return await this.#repository.findAll();
  }

  async getBrochureWithPagination(payload) {
    const brochure = await this.#repository.getBrochureWithPagination(payload);
    return brochure;
  }

  async getSingleBrochure(id) {
    const brochureData = await this.#repository.findById(id);
    if (!brochureData) throw new NotFoundError("Brochure Not Find");
    return brochureData;
  }

  async updateBrochure(id, payload, files = []) {
    const brochureData = await this.#repository.findById(id);
    if (!brochureData) throw new NotFoundError("Brochure Not Found");

    if (files.length > 0) {
      const images = await ImgUploader(files);
      for (const key in images) {
        payload[key] = images[key];
      }

      if (brochureData.image) {
        await removeUploadFile(brochureData.image);
      }
    }

    const updatedBrochure = await this.#repository.updateById(id, payload);
    return updatedBrochure;
  }

  async deleteBrochure(id) {
    const brochure = await this.#repository.findById(id);
    if (!brochure) throw new NotFoundError("Brochure not found");
    const deletedBrochure = await this.#repository.deleteById(id);
    // Collect all images/files that need to be deleted
    const filesToDelete = [];
    if (deletedBrochure.image1) filesToDelete.push(deletedBrochure.image1);
    if (deletedBrochure.image2) filesToDelete.push(deletedBrochure.image2);
    if (deletedBrochure.pdf) filesToDelete.push(deletedBrochure.pdf);

    if (deletedBrochure) {
      // Remove all associated files from storage
      for (const filePath of filesToDelete) {
        await removeUploadFile(filePath);
      }
    }
    return deletedBrochure;
  }
}

module.exports = new BrochureService(brochureRepository, "brochure");
