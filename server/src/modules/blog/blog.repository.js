const { BlogSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");



class BlogRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createBlog(payload) {
    const newBlog = await this.#model.create(payload);
    return newBlog;
  }

  async getBlogWithPagination(payload) {
    try {
      const blogs = await pagination(payload, async (limit, offset, sortOrder) => {
        const blogs = await this.#model.find({
        })
          .sort({ createdAt: sortOrder, })
          .skip(offset)
          .limit(limit)
        // .populate('') 
        // .populate('') 
        const totalBlog = await this.#model.countDocuments();

        return { doc: blogs, totalDoc: totalBlog };
      });

      return blogs;
    } catch (error) {
      console.error("Error getting blogs with pagination:", error);
      throw error;
    }
  }

  
}

module.exports = new BlogRepository(BlogSchema);

