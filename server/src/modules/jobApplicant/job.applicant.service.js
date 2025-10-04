const ImgUploader = require("../../middleware/upload/ImgUploder.js");
const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const jobApplicantRepository = require("./job.applicant.repository.js");

class JobApplicantService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createJobApplicant(payload, payloadFiles) {
    const { files } = payloadFiles;

    const images = await ImgUploader(files);
    for (const key in images) {
      payload[key] = images[key];
    }

    const jobApplicantData = await this.#repository.createJobApplicant(payload);
    return jobApplicantData;
  }

  async getAllJobApplicant() {
    return await this.#repository.findAll();
  }

  async getJobApplicantWithPagination(payload) {
    const jobApplicant = await this.#repository.getJobApplicantWithPagination(
      payload
    );
    return jobApplicant;
  }

  async getSingleJobApplicant(id) {
    const jobApplicantData = await this.#repository.findById(id);
    if (!jobApplicantData) throw new NotFoundError("JobApplicant Not Find");
    return jobApplicantData;
  }

  async updateJobApplicant(id, payload) {
    const jobApplicantData = await this.#repository.updateById(id, payload);
    if (!jobApplicantData) throw new NotFoundError("JobApplicant Not Find");

    return jobApplicantData;
  }

  async deleteJobApplicant(id) {
    const jobApplicant = await this.#repository.findById(id);
    if (!jobApplicant) throw new NotFoundError("JobApplicant not found");
    const deletedJobApplicant = await this.#repository.deleteById(id);

    return deletedJobApplicant;
  }
}

module.exports = new JobApplicantService(
  jobApplicantRepository,
  "jobApplicant"
);
