const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const eventRepository = require("./event.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class EventService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createEvent(payload, payloadFiles) {
    const { files } = payloadFiles;
    // const { title, details, type } = payload;
    // if (!title ||!details) throw new Error("title and details are required");
    if (!files) throw new Error("image is required");

    const images = await ImgUploader(files);
    for (const key in images) {
      payload[key] = images[key];
    }

    const eventData = await this.#repository.createEvent(payload);
    return eventData;
  }

  async getAllEvent() {
    return await this.#repository.findAll({}, [], {}, { createdAt: 1 });
  }

  async getEventWithPagination(payload) {
    const event = await this.#repository.getEventWithPagination(payload);
    return event;
  }

  async getSingleEvent(id) {
    const eventData = await this.#repository.findById(id);
    if (!eventData) throw new NotFoundError("Event Not Find");
    return eventData;
  }

  async updateEvent(id, payloadFiles, payload) {
    const { files } = payloadFiles;

    if (files?.length) {
      const images = await ImgUploader(files);
      for (const key in images) {
        payload[key] = images[key];
      }
    }

    const eventData = await this.#repository.updateById(id, payload);
    if (!eventData) throw new NotFoundError("Event Not Find");

    if (files.length && eventData) {
      await removeUploadFile(eventData?.image);
    }
    return eventData;
  }

  async deleteEvent(id) {
    const event = await this.#repository.findById(id);
    if (!event) throw new NotFoundError("Event not found");
    const deletedEvent = await this.#repository.deleteById(id);
    if (deletedEvent) {
      await removeUploadFile(event?.image);
    }
    return deletedEvent;
  }
}

module.exports = new EventService(eventRepository, "event");
