import { useState, useEffect } from "react";
import { message } from "antd";
import axiosInstance from "../components/Axios";

const useFeaturedActions = () => {
  const [featured, setFeatured] = useState([]); // Stores all featured items
  const [featuredItem, setFeaturedItem] = useState(null); // Stores a single featured item
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch All Featured Items
  const getAllFeatured = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/featured");
      setFeatured(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to get featured items");
      message.error("Failed to get featured items");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a Single Featured Item by ID
  const getSingleFeatured = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/featured/${id}`);
      setFeaturedItem(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to get featured item");
      message.error("Failed to get featured item");
    } finally {
      setLoading(false);
    }
  };

  // Create a New Featured Item
  const createFeatured = async (featuredData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/featured", featuredData);
      setFeatured((prev) => [...prev, response.data]);
      await getAllFeatured();
      message.success("Featured item created successfully!");
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create featured item");
      message.error("Failed to create featured item");
    } finally {
      setLoading(false);
    }
  };

  // Update an Existing Featured Item
  const updateFeatured = async (id, featuredData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.put(`/featured/${id}`, featuredData);
      setFeatured((prev) =>
        prev.map((f) => (f._id === id ? response.data : f))
      ); // Update state
      await getAllFeatured();
      message.success("Featured item updated successfully!");
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update featured item");
      message.error("Failed to update featured item");
    } finally {
      setLoading(false);
    }
  };

  // Delete a Featured Item
  const deleteFeatured = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/featured/${id}`);
      setFeatured((prev) => prev.filter((f) => f._id !== id)); // Remove from state
      await getAllFeatured();
      message.success("Featured item deleted successfully!");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete featured item");
      message.error("Failed to delete featured item");
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch featured items when hook is used
  useEffect(() => {
    getAllFeatured();
  }, []);

  return {
    featured,
    featuredItem,
    loading,
    error,
    getAllFeatured,
    getSingleFeatured,
    createFeatured,
    updateFeatured,
    deleteFeatured,
  };
};

export default useFeaturedActions;
