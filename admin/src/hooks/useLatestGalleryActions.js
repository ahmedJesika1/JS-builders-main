import { useState, useEffect } from "react";
import { message } from "antd";
import axiosInstance from "../components/Axios";

const useLatestGalleryActions = () => {
  const [latestGallerys, setLatestGallerys] = useState([]); // Stores all latestGallerys
  const [latestGallery, setLatestGallery] = useState(null); // Stores a single latestGallery
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch All LatestGallerys
  const getAllLatestGallerys = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/latest-gallery");
      setLatestGallerys(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to get latestGallerys");
      message.error("Failed to get latestGallerys");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a Single LatestGallery by ID
  const getSingleLatestGallery = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/latest-gallery/${id}`);
      setLatestGallery(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to get latestGallery");
      message.error("Failed to get latestGallery");
    } finally {
      setLoading(false);
    }
  };

  // Create a New LatestGallery
  const createLatestGallery = async (latestGalleryData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post(
        "/latest-gallery",
        latestGalleryData
      );
      setLatestGallerys((prev) => [...prev, response.data]);
      await getAllLatestGallerys();
      message.success("LatestGallery created successfully!");
      return response.data;
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to create latestGallery"
      );
      message.error("Failed to create latestGallery");
    } finally {
      setLoading(false);
    }
  };

  // Update an Existing LatestGallery
  const updateLatestGallery = async (id, latestGalleryData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.put(
        `/latest-gallery/${id}`,
        latestGalleryData
      );
      setLatestGallerys((prev) =>
        prev.map((b) => (b._id === id ? response.data : b))
      ); // Update state
      await getAllLatestGallerys();
      message.success("LatestGallery updated successfully!");
      return response.data;
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to update latestGallery"
      );
      message.error("Failed to update latestGallery");
    } finally {
      setLoading(false);
    }
  };

  // Delete a LatestGallery
  const deleteLatestGallery = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/latest-gallery/${id}`);
      setLatestGallerys((prev) => prev.filter((b) => b._id !== id)); // Remove from state
      await getAllLatestGallerys();
      message.success("LatestGallery deleted successfully!");
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to delete latestGallery"
      );
      message.error("Failed to delete latestGallery");
    } finally {
      setLoading(false);
    }
  };

  // Auto-get latestGallerys when hook is used
  useEffect(() => {
    getAllLatestGallerys();
  }, []);

  return {
    latestGallerys,
    latestGallery,
    loading,
    error,
    getAllLatestGallerys,
    getSingleLatestGallery,
    createLatestGallery,
    updateLatestGallery,
    deleteLatestGallery,
  };
};

export default useLatestGalleryActions;
