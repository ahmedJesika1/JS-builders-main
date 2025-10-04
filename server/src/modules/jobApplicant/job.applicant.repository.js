const { JobApplicantSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");

class JobApplicantRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createJobApplicant(payload) {
    const newJobApplicant = await this.#model.create(payload);
    return newJobApplicant;
  }

  async getJobApplicantWithPagination(payload) {
    try {
      const jobApplicants = await pagination(
        payload,
        async (limit, offset, sortOrder) => {
          const jobApplicants = await this.#model
            .find({})
            .sort({ createdAt: sortOrder })
            .skip(offset)
            .limit(limit);
          // .populate('')
          // .populate('')
          const totalJobApplicant = await this.#model.countDocuments();

          return { doc: jobApplicants, totalDoc: totalJobApplicant };
        }
      );

      return jobApplicants;
    } catch (error) {
      console.error("Error getting jobApplicants with pagination:", error);
      throw error;
    }
  }
}

module.exports = new JobApplicantRepository(JobApplicantSchema);
