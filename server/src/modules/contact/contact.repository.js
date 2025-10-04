const { ContactSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");

class ContactRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createContact(payload) {
    const newContact = await this.#model.create(payload);
    return newContact;
  }

  async getContactWithPagination(payload) {
    try {
      const contacts = await pagination(
        payload,
        async (limit, offset, sortOrder) => {
          const contacts = await this.#model
            .find({})
            .sort({ createdAt: sortOrder })
            .skip(offset)
            .limit(limit);
          // .populate('')
          // .populate('')
          const totalContact = await this.#model.countDocuments();

          return { doc: contacts, totalDoc: totalContact };
        }
      );

      return contacts;
    } catch (error) {
      console.error("Error getting contacts with pagination:", error);
      throw error;
    }
  }
}

module.exports = new ContactRepository(ContactSchema);
