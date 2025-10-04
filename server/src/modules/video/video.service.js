const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const videoRepository = require("./video.repository.js");

class VideoService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createVideo(payload) {
    const videoData = await this.#repository.createVideo(payload);
    return videoData;
  }

  async getAllVideo(type) {
    if (type) {
      const videoData = await this.#repository.findAll({ type });
      return videoData;
    } else {
      const videoData = await this.#repository.findAll();
      return videoData;
    }
  }

  async getVideoWithPagination(payload) {
    const video = await this.#repository.getVideoWithPagination(payload);
    return video;
  }

  async getSingleVideo(id) {
    const videoData = await this.#repository.findById(id);
    if (!videoData) throw new NotFoundError("Video Not Find");
    return videoData;
  }

  async updateVideo(id, payload) {
    const videoData = await this.#repository.updateById(id, payload);
    if (!videoData) throw new NotFoundError("Video Not Find");

    return videoData;
  }

  async deleteVideo(id) {
    const video = await this.#repository.findById(id);
    if (!video) throw new NotFoundError("Video not found");
    const deletedVideo = await this.#repository.deleteById(id);

    return deletedVideo;
  }
}

module.exports = new VideoService(videoRepository, "video");
