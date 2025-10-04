class BaseRepository {
  #model;
  constructor(model) {
    this.#model = model;
  }

  async create(item, session) {
    return await this.#model.create(item, session);
  }

  async findAll(
    filter = {},
    populateFields = [],
    excludeFields = {},
    sort = { createdAt: -1 }
  ) {
    console.log("this.#model", this.#model);
    let query = this.#model.find(filter).sort(sort);

    // Apply global field exclusion if specified
    if (excludeFields.global) {
      query = query.select(excludeFields.global); // Exclude fields globally
    }

    // Apply population with field exclusion if fields are specified
    if (populateFields.length > 0) {
      populateFields.forEach((field) => {
        const options = excludeFields[field]
          ? { select: excludeFields[field] }
          : {};
        query = query.populate({ path: field, ...options });
      });
    }

    const results = await query;
    return results;
  }

  async findOne(filter = {}, populateFields = [], excludeFields = {}) {
    let query = this.#model.findOne(filter);

    // Apply population with field exclusion if fields are specified
    if (populateFields.length > 0) {
      populateFields.forEach((field) => {
        const options = excludeFields[field]
          ? { select: excludeFields[field] }
          : {};
        query = query.populate({ path: field, ...options });
      });
    }

    const results = await query;
    return results;
  }

  async findById(id, populateFields = [], selectedFields = null) {
    let query = this.#model.findById(id);
    if (populateFields.length > 0) {
      populateFields.forEach((field) => {
        query = query.populate(field);
      });
    }
    if (selectedFields) {
      query = query.select(selectedFields);
    }

    const results = await query;
    return results;
  }

  async updateById(id, updatedData, session) {
    const options = session ? { session } : {};
    return await this.#model.findByIdAndUpdate(
      id,
      { $set: updatedData },
      options
    );
  }

  async deleteById(id) {
    return await this.#model.findByIdAndDelete(id);
  }

  async deleteMany(filter, session) {
    if (!filter || typeof filter !== "object")
      throw new Error("Valid filter is required");
    return await this.#model.deleteMany(filter, { session });
  }

  async updateStatus(id, status) {
    return await this.#model.findByIdAndUpdate(
      id,
      { status: status.status },
      { new: true }
    );
  }
}

module.exports = BaseRepository;
