const { EventSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");



class EventRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createEvent(payload) {
    const newEvent = await this.#model.create(payload);
    return newEvent;
  }

  async getEventWithPagination(payload) {
    try {
      const events = await pagination(payload, async (limit, offset, sortOrder) => {
        const events = await this.#model.find({
        })
          .sort({ createdAt: sortOrder, })
          .skip(offset)
          .limit(limit)
        // .populate('') 
        // .populate('') 
        const totalEvent = await this.#model.countDocuments();

        return { doc: events, totalDoc: totalEvent };
      });

      return events;
    } catch (error) {
      console.error("Error getting events with pagination:", error);
      throw error;
    }
  }

  
}

module.exports = new EventRepository(EventSchema);

