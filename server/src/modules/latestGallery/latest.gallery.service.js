const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const latestGalleryRepository = require("./latest.gallery.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class LatestGalleryService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createLatestGallery(payload, payloadFiles) {
    const { files } = payloadFiles;
    // const { title, details, type } = payload;
    // if (!title ||!details) throw new Error("title and details are required");
    if (!files) throw new Error("image is required");

    const images = await ImgUploader(files);
    for (const key in images) {
      payload[key] = images[key];
    }

    const latestGalleryData = await this.#repository.createLatestGallery(
      payload
    );
    return latestGalleryData;
  }

  async getAllLatestGallery() {
    return await this.#repository.findAll({}, [], {}, { createdAt: 1 });
  }

  async getLatestGalleryWithPagination(payload) {
    const latestGallery = await this.#repository.getLatestGalleryWithPagination(
      payload
    );
    return latestGallery;
  }

  async getSingleLatestGallery(id) {
    const latestGalleryData = await this.#repository.findById(id);
    if (!latestGalleryData) throw new NotFoundError("LatestGallery Not Find");
    return latestGalleryData;
  }

  async updateLatestGallery(id, payloadFiles, payload) {
    const { files } = payloadFiles;

    if (files?.length) {
      const images = await ImgUploader(files);
      for (const key in images) {
        payload[key] = images[key];
      }
    }

    console.log(payload, "payload from latest service............");
    const gallaryData = await this.#repository.findById(id);
    if (!gallaryData) throw new NotFoundError("LatestGallery Not Find");
    console.log(gallaryData, "gallary data from latest service........");

    const latestGalleryData = await this.#repository.updateById(id, payload);

    if (files.length && latestGalleryData) {
      await removeUploadFile(gallaryData?.image);
    }
    return latestGalleryData;
  }

  async deleteLatestGallery(id) {
    const latestGallery = await this.#repository.findById(id);
    if (!latestGallery) throw new NotFoundError("LatestGallery not found");

    const deletedLatestGallery = await this.#repository.deleteById(id);
    if (deletedLatestGallery) {
      await removeUploadFile(latestGallery?.image);
    }
    return deletedLatestGallery;
  }
}

module.exports = new LatestGalleryService(
  latestGalleryRepository,
  "latestGallery"
);
