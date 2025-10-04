import { useState, useEffect } from "react";
import { message } from "antd";
import axiosInstance from "../components/Axios";

const useCareerActions = () => {
  const [careers, setCareers] = useState([]); // Stores all careers
  const [career, setCareer] = useState(null); // Stores a single career
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch All Careers
  const getAllCareers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/careers");
      setCareers(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to get careers");
      message.error("Failed to get careers");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a Single Career by ID
  const getSingleCareer = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/careers/${id}`);
      setCareer(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to get career");
      message.error("Failed to get career");
    } finally {
      setLoading(false);
    }
  };

  // Create a New Career
  const createCareer = async (careerData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/careers", careerData);
      setCareers((prev) => [...prev, response.data]);
      await getAllCareers();
      message.success("Career created successfully!");
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create career");
      message.error("Failed to create career");
    } finally {
      setLoading(false);
    }
  };

  // Update an Existing Career
  const updateCareer = async (id, careerData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.put(`/careers/${id}`, careerData);
      setCareers((prev) => prev.map((b) => (b._id === id ? response.data : b))); // Update state
      await getAllCareers();
      message.success("Career updated successfully!");
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update career");
      message.error("Failed to update career");
    } finally {
      setLoading(false);
    }
  };

  // Delete a Career
  const deleteCareer = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/careers/${id}`);
      setCareers((prev) => prev.filter((b) => b._id !== id)); // Remove from state
      await getAllCareers();
      message.success("Career deleted successfully!");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete career");
      message.error("Failed to delete career");
    } finally {
      setLoading(false);
    }
  };

  // Auto-get careers when hook is used
  useEffect(() => {
    getAllCareers();
  }, []);

  return {
    careers,
    career,
    loading,
    error,
    getAllCareers,
    getSingleCareer,
    createCareer,
    updateCareer,
    deleteCareer,
  };
};

export default useCareerActions;
