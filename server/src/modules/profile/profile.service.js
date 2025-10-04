const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const profileRepository = require("./profile.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class ProfileService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createProfile(payload, payloadFiles) {
    const { files } = payloadFiles;
    // const { title, description, detail, pdf, quote, honorName, honorDesignation, video

    // } = payload;
    // if (!title ||!details) throw new Error("title and details are required");
    if (!files) throw new Error("image is required");

    const images = await ImgUploader(files);
    for (const key in images) {
      payload[key] = images[key];
    }

    const profileData = await this.#repository.createProfile(payload);
    return profileData;
  }

  async getAllProfile() {
    return await this.#repository.findAll();
  }

  async getProfileWithPagination(payload) {
    const profile = await this.#repository.getProfileWithPagination(payload);
    return profile;
  }

  async getSingleProfile(id) {
    const profileData = await this.#repository.findById(id);
    if (!profileData) throw new NotFoundError("Profile Not Find");
    return profileData;
  }

  async updateProfile(id, payloadFiles, payload) {
    const { files } = payloadFiles;
    const profileData = await this.#repository.findById(id);
    if (!profileData) throw new NotFoundError("Profile Not Found");

    const filesToDelete = [];

    if (files?.length) {
      const images = await ImgUploader(files);

      for (const key in images) {
        // If a new file is uploaded for this field, mark the old one for deletion
        if (profileData[key]) {
          filesToDelete.push(profileData[key]);
        }
        payload[key] = images[key]; // Update payload with new files
      }
    }

    const updatedProfile = await this.#repository.updateById(id, payload);

    // Remove only the replaced files from storage
    for (const filePath of filesToDelete) {
      await removeUploadFile(filePath);
    }

    return updatedProfile;
  }

  async deleteProfile(id) {
    const profile = await this.#repository.findById(id);
    if (!profile) throw new NotFoundError("Profile not found");
    const deletedProfile = await this.#repository.deleteById(id);
    // Collect all images/files that need to be deleted
    const filesToDelete = [];
    if (deletedProfile.image1) filesToDelete.push(deletedProfile.image1);
    if (deletedProfile.image2) filesToDelete.push(deletedProfile.image2);
    if (deletedProfile.pdf) filesToDelete.push(deletedProfile.pdf);

    if (deletedProfile) {
      // Remove all associated files from storage
      for (const filePath of filesToDelete) {
        await removeUploadFile(filePath);
      }
    }
    return deletedProfile;
  }
}

module.exports = new ProfileService(profileRepository, "profile");
