const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const publicationRepository = require("./publication.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class PublicationService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createPublication(payload, payloadFiles) {
    const { files } = payloadFiles;
    // const { title, details, type } = payload;
    // if (!title ||!details) throw new Error("title and details are required");
    if (!files) throw new Error("image is required");

    const images = await ImgUploader(files);
    for (const key in images) {
      payload[key] = images[key];
    }

    const publicationData = await this.#repository.createPublication(payload);
    return publicationData;
  }

  async getAllPublication() {
    return await this.#repository.findAll({}, [], {}, { createdAt: 1 });
  }

  async getPublicationWithPagination(payload) {
    const publication = await this.#repository.getPublicationWithPagination(payload);
    return publication;
  }

  async getSinglePublication(id) {
    const publicationData = await this.#repository.findById(id);
    if (!publicationData) throw new NotFoundError("Publication Not Find");
    return publicationData;
  }

  async updatePublication(id, payloadFiles, payload) {
    const { files } = payloadFiles;

    if (files?.length) {
      const images = await ImgUploader(files);
      for (const key in images) {
        payload[key] = images[key];
      }
    }

    const publicationData = await this.#repository.updateById(id, payload);
    if (!publicationData) throw new NotFoundError("Publication Not Find");

    if (files.length && publicationData) {
      await removeUploadFile(publicationData?.image);
    }
    return publicationData;
  }

  async deletePublication(id) {
    const publication = await this.#repository.findById(id);
    if (!publication) throw new NotFoundError("Publication not found");
    const deletedPublication = await this.#repository.deleteById(id);
    if (deletedPublication) {
      await removeUploadFile(publication?.image);
    }
    return deletedPublication;
  }
}

module.exports = new PublicationService(publicationRepository, "publication");
