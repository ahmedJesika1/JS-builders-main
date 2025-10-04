const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const blogRepository = require("./blog.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class BlogService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createBlog(payload, payloadFiles) {
    const { files } = payloadFiles;
    // const { title, details, type } = payload;
    // if (!title ||!details) throw new Error("title and details are required");
    if (!files) throw new Error("image is required");

    const images = await ImgUploader(files);
    for (const key in images) {
      payload[key] = images[key];
    }

    const blogData = await this.#repository.createBlog(payload);
    return blogData;
  }

  async getAllBlog() {
    return await this.#repository.findAll({}, [], {}, { createdAt: 1 });
  }

  async getBlogWithPagination(payload) {
    const blog = await this.#repository.getBlogWithPagination(payload);
    return blog;
  }

  async getSingleBlog(id) {
    const blogData = await this.#repository.findById(id);
    if (!blogData) throw new NotFoundError("Blog Not Find");
    return blogData;
  }

  async updateBlog(id, payloadFiles, payload) {
    const { files } = payloadFiles;

    if (files?.length) {
      const images = await ImgUploader(files);
      for (const key in images) {
        payload[key] = images[key];
      }
    }

    const blogData = await this.#repository.updateById(id, payload);
    if (!blogData) throw new NotFoundError("Blog Not Find");

    if (files.length && blogData) {
      await removeUploadFile(blogData?.image);
    }
    return blogData;
  }

  async deleteBlog(id) {
    const blog = await this.#repository.findById(id);
    if (!blog) throw new NotFoundError("Blog not found");
    const deletedBlog = await this.#repository.deleteById(id);
    if (deletedBlog) {
      await removeUploadFile(blog?.image);
    }
    return deletedBlog;
  }
}

module.exports = new BlogService(blogRepository, "blog");
