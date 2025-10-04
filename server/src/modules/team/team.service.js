const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const teamRepository = require("./team.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class TeamService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createTeam(payload, payloadFiles) {
    const { files } = payloadFiles;
    // const { title, details, type } = payload;
    // if (!title ||!details) throw new Error("title and details are required");
    if (!files) throw new Error("image is required");

    const images = await ImgUploader(files);
    for (const key in images) {
      payload[key] = images[key];
    }

    const teamData = await this.#repository.createTeam(payload);
    return teamData;
  }

  async getAllTeam() {
    return await this.#repository.findAll({}, [], {}, { createdAt: 1 });
  }

  async getTeamWithPagination(payload) {
    const team = await this.#repository.getTeamWithPagination(payload);
    return team;
  }

  async getSingleTeam(id) {
    const teamData = await this.#repository.findById(id);
    if (!teamData) throw new NotFoundError("Team Not Find");
    return teamData;
  }

  async updateTeam(id, payloadFiles, payload) {
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

  async deleteTeam(id) {
    const team = await this.#repository.findById(id);
    if (!team) throw new NotFoundError("Team not found");
    const deletedTeam = await this.#repository.deleteById(id);
    if (deletedTeam) {
      await removeUploadFile(team?.image);
    }
    return deletedTeam;
  }
}

module.exports = new TeamService(teamRepository, "team");
