const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const serviceRepository = require("./service.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class ServiceService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createService(payload, payloadFiles) {
    const { files } = payloadFiles;

    if (!files) throw new Error("image is required");

    let images = await ImgUploader(files);

    // before saving
    if (typeof payload.featuredItems === "string") {
      payload.featuredItems = JSON.parse(payload.featuredItems);
    }

    // Flattening logic
    if (Array.isArray(images) && images[0]?.images) {
      images = images[0].images;
    }
    payload.images = images;

    // Extra check if frontend sent nested object
    if (payload.images?.images) {
      payload.images = payload.images.images;
    }

    console.log(payload);
    

    const serviceData = await this.#repository.createService(payload);
    return serviceData;
  }

  async getAllService(filter) {
    return await this.#repository.findAllWithPopulate(filter);
  }

  async getServiceWithPagination(payload) {
    const service = await this.#repository.getServiceWithPagination(payload);
    return service;
  }

  async getSingleService(id) {
    const serviceData = await this.#repository.findByIdWithPopulate(id);

    if (!serviceData) throw new NotFoundError("Service Not Find");
    return serviceData;
  }

  async updateService(id, payloadFiles, payload) {
    const { files } = payloadFiles;

    if (files?.length) {
      let images = await ImgUploader(files);

      // Flattening logic
      if (Array.isArray(images) && images[0]?.images) {
        images = images[0].images;
      }

      // Extra check if frontend sent nested object
      if (images?.images) {
        images = images.images;
      }

      payload.images = images;
    }

    const serviceData = await this.#repository.updateById(id, payload);
    if (!serviceData) throw new NotFoundError("Service Not Find");

    if (files?.length && serviceData?.images?.length) {
      for (const imgPath of serviceData.images) {
        if (imgPath) {
          await removeUploadFile(imgPath);
        }
      }
    }

    return serviceData;
  }

  async deleteService(id) {
    const service = await this.#repository.findById(id);
    if (!service) throw new NotFoundError("Service not found");
    const deletedService = await this.#repository.deleteById(id);

    if (deletedService?.images?.length) {
      for (const imgPath of deletedService.images) {
        if (imgPath) {
          await removeUploadFile(imgPath);
        }
      }
    }

    return deletedService;
  }
}

module.exports = new ServiceService(serviceRepository, "service");
