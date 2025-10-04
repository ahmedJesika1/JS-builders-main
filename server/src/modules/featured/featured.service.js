const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const featuredRepository = require("./featured.repository.js");
const { removeUploadFile } = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class FeaturedService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createFeatured(payload, payloadFiles, session) {
    const { files } = payloadFiles;
    if (files?.length) {
      const images = await ImgUploader(files);
      for (const key in images) {
        payload[key] = images[key];
      }
    }

    const newFeatured = session
      ? (await this.#repository.create([payload], { session }))[0]
      : await this.#repository.create(payload);

    return newFeatured;
  }

  async getAllFeatured() {
    return await this.#repository.findAll();
  }

  async getFeaturedWithPagination(payload) {
    return await this.#repository.getFeaturedWithPagination(payload);
  }

  async getSingleFeatured(id) {
    const item = await this.#repository.findById(id);
    if (!item) throw new NotFoundError("Featured item not found");
    return item;
  }

  async updateFeatured(id, payloadFiles, payload) {
    const { files } = payloadFiles;

    if (files?.length) {
      const images = await ImgUploader(files);
      for (const key in images) {
        payload[key] = images[key];
      }
    }

    const updatedItem = await this.#repository.updateById(id, payload);
    if (!updatedItem) throw new NotFoundError("Featured item not found");

    if (files?.length && updatedItem?.image) {
      await removeUploadFile(updatedItem.image);
    }

    return updatedItem;
  }

  async deleteFeatured(id) {
    const item = await this.#repository.findById(id);
    if (!item) throw new NotFoundError("Featured item not found");

    const deletedItem = await this.#repository.deleteById(id);

    if (deletedItem?.image) {
      await removeUploadFile(deletedItem.image);
    }

    return deletedItem;
  }
}

module.exports = new FeaturedService(featuredRepository, "featured");
