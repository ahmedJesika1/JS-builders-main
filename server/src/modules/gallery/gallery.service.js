const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const galleryRepository = require("./gallery.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class GalleryService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createGallery(payload, payloadFiles) {
    const { files } = payloadFiles;
    // const { title, description, detail, type, isActive } = payload;
    // if (!type) throw new Error("Type is required");
    // if (!files) throw new Error("image is required");

    const uploadedImages = await ImgUploader(files);

    if (!payload.event || !Array.isArray(payload.event)) {
      throw new Error("Event must be an array");
    }
    console.log(uploadedImages, "uploaded image from service//////////");

    payload.event = payload.event.map((event, index) => {
      const imageKey = `event[${index}][image]`;
      // return {
      //   ...event,
      //   image: uploadedImages[imageKey] ? [uploadedImages[imageKey]] : [],
      // };

      const newImages = uploadedImages[imageKey]
        ? Array.isArray(uploadedImages[imageKey])
          ? uploadedImages[imageKey]
          : [uploadedImages[imageKey]]
        : [];

      return {
        ...event,
        image: [...newImages],
      };
    });
    console.log(payload, "payload from service==================");

    const galleryData = await this.#repository.createGallery(payload);
    return galleryData;
  }

  async getAllGallery(type) {
    if (type) {
      const galleryData = await this.#repository.findAll({ type });
      return galleryData;
    } else {
      const galleryData = await this.#repository.findAll();
      return galleryData;
    }
  }

  async getGalleryWithPagination(payload) {
    const gallery = await this.#repository.getGalleryWithPagination(payload);
    return gallery;
  }

  async getSingleGallery(id) {
    const galleryData = await this.#repository.findById(id);
    if (!galleryData) throw new NotFoundError("Gallery Not Find");
    return galleryData;
  }

  async updateGallery(id, payloadFiles, payload) {
    const { files } = payloadFiles;
    const existingGallery = await this.#repository.findById(id);
    if (!existingGallery) throw new NotFoundError("Gallery Not Found");

    let uploadedImages = {};

    if (files?.length) {
      uploadedImages = await ImgUploader(files);
    }

    if (!payload.event || !Array.isArray(payload.event)) {
      throw new Error("Event must be an array");
    }

    console.log(uploadedImages, "uploaded images from service//////////");

    payload.event = payload.event.map((event, index) => {
      const imageKey = `event[${index}][image]`;

      const existingImages = existingGallery.event[index]?.image || [];

      const newImages = uploadedImages[imageKey]
        ? Array.isArray(uploadedImages[imageKey])
          ? uploadedImages[imageKey]
          : [uploadedImages[imageKey]]
        : [];

      // Handle removed images
      const removedImages = event.removedImages || [];
      console.log(removedImages, "Removed images from event@@@@@@@@@@@@@@@@@");
      const updatedExistingImages = existingImages.filter(
        (image) => !removedImages.includes(image)
      );
      console.log(updatedExistingImages, "updated existing images after filtering@@@@@@@@@@@@@@@@@");

      return {
        ...event,
        // image: [...newImages],
        image: [...updatedExistingImages, ...newImages],
      };
    });

    console.log(payload, "final payload after merging images==============");

    const galleryData = await this.#repository.updateById(id, payload);
    if (!galleryData) throw new NotFoundError("Gallery Not Found");

    return galleryData;
  }

  async deleteGallery(id) {
    const gallery = await this.#repository.findById(id);
    if (!gallery) throw new NotFoundError("Gallery not found");
    const deletedGallery = await this.#repository.deleteById(id);
    // console.log(
    //   deletedGallery,
    //   "deleted gallery from delete gallry service-------------------"
    // );
    if (deletedGallery && deletedGallery?.data?.image) {
      await removeUploadFile(deletedGallery.data.image);
    }
    return deletedGallery;
  }
}

module.exports = new GalleryService(galleryRepository, "gallery");
