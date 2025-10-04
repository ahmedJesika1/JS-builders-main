import { useState, useEffect } from "react";
import { message } from "antd";
import axiosInstance from "../components/Axios";

const useAboutUsActions = () => {
  const [aboutUsData, setAboutUsData] = useState([]); // Stores all About Us records
  const [aboutUs, setAboutUs] = useState(null); // Stores a single About Us record
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //  Fetch All About Us Records
  const getAllAboutUs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/about-us");
      setAboutUsData(response.data.data); // Assuming your response is in `data.data`
    } catch (error) {
      setError(error.response?.data?.message || "Failed to get About Us data");
      message.error("Failed to get About Us data");
    } finally {
      setLoading(false);
    }
  };

  //  Fetch a Single About Us Record by ID
  const getSingleAboutUs = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/about-us/${id}`);
      setAboutUs(response.data.data); // Assuming your response is in `data.data`
    } catch (error) {
      setError(error.response?.data?.message || "Failed to get About Us data");
      message.error("Failed to get About Us data");
    } finally {
      setLoading(false);
    }
  };

  //  Create a New About Us Record
  const createAboutUs = async (aboutUsData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/about-us", aboutUsData);
      setAboutUsData((prev) => [...prev, response.data]); // Add new About Us data to state
      message.success("About Us created successfully!");
      await getAllAboutUs();
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create About Us");
      message.error("Failed to create About Us");
    } finally {
      setLoading(false);
    }
  };

  //  Update an Existing About Us Record
  const updateAboutUs = async (id, aboutUsData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.put(`/about-us/${id}`, aboutUsData);
      setAboutUsData((prev) =>
        prev.map((item) => (item._id === id ? response.data : item))
      ); // Update state
      message.success("About Us updated successfully!");
      await getAllAboutUs();
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update About Us");
      message.error("Failed to update About Us");
    } finally {
      setLoading(false);
    }
  };

  //  Delete an About Us Record
  const deleteAboutUs = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/about-us/${id}`);
      setAboutUsData((prev) => prev.filter((item) => item._id !== id)); // Remove from state
      message.success("About Us deleted successfully!");
      await getAllAboutUs();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete About Us");
      message.error("Failed to delete About Us");
    } finally {
      setLoading(false);
    }
  };

  // Auto-get About Us records when the hook is used
  useEffect(() => {
    getAllAboutUs();
  }, []);

  return {
    aboutUsData,
    aboutUs,
    loading,
    error,
    getAllAboutUs,
    getSingleAboutUs,
    createAboutUs,
    updateAboutUs,
    deleteAboutUs,
  };
};

export default useAboutUsActions;
