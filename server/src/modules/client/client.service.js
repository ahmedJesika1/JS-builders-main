const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const teamRepository = require("./client.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class ClientService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createClient(payload, payloadFiles) {
    const { files } = payloadFiles;
    // const { title, details, type } = payload;
    // if (!title ||!details) throw new Error("title and details are required");
    if (!files) throw new Error("image is required");

    const images = await ImgUploader(files);
    for (const key in images) {
      payload[key] = images[key];
    }

    const teamData = await this.#repository.createClient(payload);
    return teamData;
  }

  async getAllClient() {
    return await this.#repository.findAll({}, [], {}, { createdAt: 1 });
  }

  async getClientWithPagination(payload) {
    const team = await this.#repository.getClientWithPagination(payload);
    return team;
  }

  async getSingleClient(id) {
    const teamData = await this.#repository.findById(id);
    if (!teamData) throw new NotFoundError("Team Not Find");
    return teamData;
  }

  async updateClient(id, payloadFiles, payload) {
    const { files } = payloadFiles;

    if (files?.length) {
      const images = await ImgUploader(files);
      for (const key in images) {
        payload[key] = images[key];
      }
    }

    const teamData = await this.#repository.updateById(id, payload);
    if (!teamData) throw new NotFoundError("Team Not Find");

    if (files.length && teamData) {
      await removeUploadFile(teamData?.image);
    }
    return teamData;
  }

  async deleteClient(id) {
    const team = await this.#repository.findById(id);
    if (!team) throw new NotFoundError("Team not found");
    const deletedTeam = await this.#repository.deleteById(id);
    if (deletedTeam) {
      await removeUploadFile(team?.image);
    }
    return deletedTeam;
  }
}

module.exports = new ClientService(teamRepository, "team");
