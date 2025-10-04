const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const BlogService = require("./blog.service.js");

class BlogController {
  createBlog = withTransaction(async (req, res, next, session) => {
    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      title: req?.body?.title,
      details: req?.body?.details,
      type: req?.body?.type,
      // isActive: req?.body?.isActive,
    };
    const blogResult = await BlogService.createBlog(
      payload,
      payloadFiles,
      session
    );
    const resDoc = responseHandler(
      201,
      "Blog Created successfully",
      blogResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllBlog = catchError(async (req, res) => {
    const blogResult = await BlogService.getAllBlog();
    const resDoc = responseHandler(200, "Get All Blogs", blogResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getBlogWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const blog = await BlogService.getBlogWithPagination(payload);
    const resDoc = responseHandler(200, "Blogs get successfully", blog);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleBlog = catchError(async (req, res) => {
    const id = req.params.id;
    const blogResult = await BlogService.getSingleBlog(id);
    const resDoc = responseHandler(
      201,
      "Single Blog successfully",
      blogResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateBlog = catchError(async (req, res) => {
    const id = req.params.id;
    const payloadFiles = {
      files: req?.files,
    };
    const payload = {
      title: req?.body?.title,
      details: req?.body?.details,
      type: req?.body?.type,
      isActive: req?.body?.isActive,
    };
    const blogResult = await BlogService.updateBlog(
      id,
      payloadFiles,
      payload
    );
    const resDoc = responseHandler(
      201,
      "Blog Update successfully",
      blogResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateBlogStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const blogResult = await BlogService.updateBlogStatus(id, status);
    const resDoc = responseHandler(
      201,
      "Blog Status Update successfully",
      blogResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteBlog = catchError(async (req, res) => {
    const id = req.params.id;

    const blogResult = await BlogService.deleteBlog(id);
    const resDoc = responseHandler(
      200,
      "Blog Deleted successfully",
      blogResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new BlogController();
