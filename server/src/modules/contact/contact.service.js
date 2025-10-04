const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const contactRepository = require("./contact.repository.js");

class ContactService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createContact(payload) {
    const contactData = await this.#repository.createContact(payload);
    return contactData;
  }

  async getAllContact() {
    return await this.#repository.findAll();
  }

  async getContactWithPagination(payload) {
    const contact = await this.#repository.getContactWithPagination(payload);
    return contact;
  }

  async getSingleContact(id) {
    const contactData = await this.#repository.findById(id);
    if (!contactData) throw new NotFoundError("Contact Not Find");
    return contactData;
  }

  async updateContact(id, payload) {
    const contactData = await this.#repository.updateById(id, payload);
    if (!contactData) throw new NotFoundError("Contact Not Find");

    return contactData;
  }

  async deleteContact(id) {
    const contact = await this.#repository.findById(id);
    if (!contact) throw new NotFoundError("Contact not found");
    const deletedContact = await this.#repository.deleteById(id);

    return deletedContact;
  }
}

module.exports = new ContactService(contactRepository, "contact");
