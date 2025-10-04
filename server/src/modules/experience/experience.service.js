const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const experienceRepository = require("./experience.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class ExperienceService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createExperience(payload, payloadFiles) {
    const { files } = payloadFiles;

    const images = await ImgUploader(files);
    for (const key in images) {
      payload[key] = images[key];
    }

    const experienceData = await this.#repository.createExperience(payload);
    return experienceData;
  }

  async getAllExperience() {
    return await this.#repository.findAll();
  }

  async getExperienceWithPagination(payload) {
    const experience = await this.#repository.getExperienceWithPagination(
      payload
    );
    return experience;
  }

  async getSingleExperience(id) {
    const experienceData = await this.#repository.findById(id);
    if (!experienceData) throw new NotFoundError("Experience Not Find");
    return experienceData;
  }

  async updateExperience(id, payloadFiles, payload) {
    const { files } = payloadFiles;
    const experienceData = await this.#repository.findById(id);
    if (!experienceData) throw new NotFoundError("Experience Not Found");

    const filesToDelete = [];

    if (files?.length) {
      const images = await ImgUploader(files);

      for (const key in images) {
        // If a new file is uploaded for this field, mark the old one for deletion
        if (experienceData[key]) {
          filesToDelete.push(experienceData[key]);
        }
        payload[key] = images[key]; // Update payload with new files
      }
    }

    const updatedExperience = await this.#repository.updateById(id, payload);

    // Remove only the replaced files from storage
    for (const filePath of filesToDelete) {
      await removeUploadFile(filePath);
    }

    return updatedExperience;
  }

  async deleteExperience(id) {
    const experience = await this.#repository.findById(id);
    if (!experience) throw new NotFoundError("Experience not found");

    // Collect all images/files that need to be deleted
    const filesToDelete = [];
    if (experience.image1) filesToDelete.push(experience.image1);
    if (experience.image2) filesToDelete.push(experience.image2);
    if (experience.pdf) filesToDelete.push(experience.pdf);

    const deletedExperience = await this.#repository.deleteById(id);

    if (deletedExperience) {
      for (const filePath of filesToDelete) {
        await removeUploadFile(filePath);
      }
    }
    return deletedExperience;
  }
}

module.exports = new ExperienceService(experienceRepository, "experience");
