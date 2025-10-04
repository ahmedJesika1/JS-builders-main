const { ClientSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");



class ClientRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createClient(payload) {
    const newTeam = await this.#model.create(payload);
    return newTeam;
  }

  async getClientWithPagination(payload) {
    try {
      const teams = await pagination(payload, async (limit, offset, sortOrder) => {
        const teams = await this.#model.find({
        })
          .sort({ createdAt: sortOrder, })
          .skip(offset)
          .limit(limit)
        // .populate('') 
        // .populate('') 
        const totalTeam = await this.#model.countDocuments();

        return { doc: teams, totalDoc: totalTeam };
      });

      return teams;
    } catch (error) {
      console.error("Error getting teams with pagination:", error);
      throw error;
    }
  }

  
}

module.exports = new ClientRepository(ClientSchema);

