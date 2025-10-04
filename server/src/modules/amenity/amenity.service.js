const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const amenityRepository = require("./amenity.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class AmenityService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createAmenity(payload, payloadFiles, session) {
    const { files } = payloadFiles;
    if (!files?.length) throw new Error("image is required");

    const images = await ImgUploader(files);
    for (const key in images) {
      payload[key] = images[key];
    }

    const newAmenity = session
      ? (await this.#repository.create([payload], { session }))[0]
      : await this.#repository.create(payload);

    return newAmenity;
  }

  async getAllAmenities() {
    return await this.#repository.findAll();
  }

  async getAmenityWithPagination(payload) {
    return await this.#repository.getAmenityWithPagination(payload);
  }

  async getSingleAmenity(id) {
    const amenity = await this.#repository.findById(id);
    if (!amenity) throw new NotFoundError("Amenity not found");
    return amenity;
  }

  async updateAmenity(id, payloadFiles, payload) {
    const { files } = payloadFiles;

    if (files?.length) {
      const images = await ImgUploader(files);
      for (const key in images) {
        payload[key] = images[key];
      }
    }

    const updatedAmenity = await this.#repository.updateById(id, payload);
    if (!updatedAmenity) throw new NotFoundError("Amenity not found");

    if (files?.length && updatedAmenity?.image) {
      await removeUploadFile(updatedAmenity.image);
    }

    return updatedAmenity;
  }

  async deleteAmenity(id) {
    const amenity = await this.#repository.findById(id);
    if (!amenity) throw new NotFoundError("Amenity not found");

    const deletedAmenity = await this.#repository.deleteById(id);

    if (deletedAmenity?.image) {
      await removeUploadFile(deletedAmenity.image);
    }

    return deletedAmenity;
  }
}

module.exports = new AmenityService(amenityRepository, "amenity");
