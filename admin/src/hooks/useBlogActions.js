import { useState, useEffect } from "react";
import { message } from "antd";
import axiosInstance from "../components/Axios";

const useBlogActions = () => {
  const [blogs, setBlogs] = useState([]); // Stores all blogs
  const [blog, setBlog] = useState(null); // Stores a single blog
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch All Blogs
  const getAllBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/news");
      setBlogs(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to get blogs");
      message.error("Failed to get blogs");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a Single Blog by ID
  const getSingleBlog = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/news/${id}`);
      setBlog(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to get blog");
      message.error("Failed to get blog");
    } finally {
      setLoading(false);
    }
  };

  // Create a New Blog
  const createBlog = async (blogData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/news", blogData);
      setBlogs((prev) => [...prev, response.data]);
      await getAllBlogs();
      message.success("Blog created successfully!");
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create blog");
      message.error("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  // Update an Existing Blog
  const updateBlog = async (id, blogData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.put(`/news/${id}`, blogData);
      setBlogs((prev) => prev.map((b) => (b._id === id ? response.data : b))); // Update state
      await getAllBlogs();
      message.success("Blog updated successfully!");
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update blog");
      message.error("Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  // Delete a Blog
  const deleteBlog = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/news/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id)); // Remove from state
      await getAllBlogs();
      message.success("Blog deleted successfully!");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete blog");
      message.error("Failed to delete blog");
    } finally {
      setLoading(false);
    }
  };

  // Auto-get blogs when hook is used
  useEffect(() => {
    getAllBlogs();
  }, []);

  return {
    blogs,
    blog,
    loading,
    error,
    getAllBlogs,
    getSingleBlog,
    createBlog,
    updateBlog,
    deleteBlog,
  };
};

export default useBlogActions;
