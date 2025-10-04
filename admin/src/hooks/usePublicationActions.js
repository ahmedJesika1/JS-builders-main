import { useState, useEffect } from "react";
import { message } from "antd";
import axiosInstance from "../components/Axios";

const usePublicationActions = () => {
  const [publications, setPublications] = useState([]); // Stores all publications
  const [publication, setPublication] = useState(null); // Stores a single publication
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch All Publications
  const getAllPublications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/publications");
      setPublications(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to get publications");
      message.error("Failed to get publications");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a Single Publication by ID
  const getSinglePublication = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/publications/${id}`);
      setPublication(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to get publication");
      message.error("Failed to get publication");
    } finally {
      setLoading(false);
    }
  };

  // Create a New Publication
  const createPublication = async (publicationData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/publications", publicationData);
      setPublications((prev) => [...prev, response.data]);
      await getAllPublications();
      message.success("Publication created successfully!");
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create publication");
      message.error("Failed to create publication");
    } finally {
      setLoading(false);
    }
  };

  // Update an Existing Publication
  const updatePublication = async (id, publicationData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.put(`/publications/${id}`, publicationData);
      setPublications((prev) => prev.map((b) => (b._id === id ? response.data : b))); // Update state
      await getAllPublications();
      message.success("Publication updated successfully!");
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update publication");
      message.error("Failed to update publication");
    } finally {
      setLoading(false);
    }
  };

  // Delete a Publication
  const deletePublication = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/publications/${id}`);
      setPublications((prev) => prev.filter((b) => b._id !== id)); // Remove from state
      await getAllPublications();
      message.success("Publication deleted successfully!");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete publication");
      message.error("Failed to delete publication");
    } finally {
      setLoading(false);
    }
  };

  // Auto-get publications when hook is used
  useEffect(() => {
    getAllPublications();
  }, []);

  return {
    publications,
    publication,
    loading,
    error,
    getAllPublications,
    getSinglePublication,
    createPublication,
    updatePublication,
    deletePublication,
  };
};

export default usePublicationActions;
