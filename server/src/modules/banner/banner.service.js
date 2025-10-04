const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const bannerRepository = require("./banner.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class BannerService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createBanner(payload, payloadFiles) {
    const { files } = payloadFiles;
    // const { title, details, type } = payload;
    // if (!title ||!details) throw new Error("title and details are required");
    if (!files) throw new Error("image is required");

    const images = await ImgUploader(files);
    for (const key in images) {
      payload[key] = images[key];
    }

    const bannerData = await this.#repository.createBanner(payload);
    return bannerData;
  }

  async getAllBanner() {
    return await this.#repository.findAll({}, [], {}, { createdAt: 1 });
  }

  async getBannerWithPagination(payload) {
    const banner = await this.#repository.getBannerWithPagination(payload);
    return banner;
  }

  async getSingleBanner(id) {
    const bannerData = await this.#repository.findById(id);
    if (!bannerData) throw new NotFoundError("Banner Not Find");
    return bannerData;
  }

  async updateBanner(id, payloadFiles, payload) {
    const { files } = payloadFiles;

    if (files?.length) {
      const images = await ImgUploader(files);
      for (const key in images) {
        payload[key] = images[key];
      }
    }

    const bannerData = await this.#repository.updateById(id, payload);
    if (!bannerData) throw new NotFoundError("Banner Not Find");

    if (files.length && bannerData) {
      await removeUploadFile(bannerData?.image);
    }
    return bannerData;
  }

  async deleteBanner(id) {
    const banner = await this.#repository.findById(id);
    if (!banner) throw new NotFoundError("Banner not found");
    const deletedBanner = await this.#repository.deleteById(id);
    if (deletedBanner) {
      await removeUploadFile(banner?.image);
    }
    return deletedBanner;
  }
}

module.exports = new BannerService(bannerRepository, "banner");
