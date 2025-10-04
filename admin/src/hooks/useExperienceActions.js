import { useState } from "react";
import axiosInstance from "../components/Axios";
import { useEffect } from "react";
import { message } from "antd";

const useExperienceActions = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all experiences
  const getAllExperiences = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/experience");
      setExperiences(response.data.data);
    } catch (err) {
      setError("Failed to fetch experiences", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single experience by ID
  const getExperienceById = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/experience/${id}`);
      return response.data.data;
    } catch (err) {
      setError("Failed to fetch experience", err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new experience
  const createExperience = async (experienceData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/experience", experienceData);
      setExperiences((prev) => [...prev, response.data]);
      await getAllExperiences();
      message.success("Experience created successfully!");
    } catch (err) {
      setError("Failed to create experience", err);
      message.error("Failed to create Experience");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing experience
  const updateExperience = async (id, experienceData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        `/experience/${id}`,
        experienceData
      );
      setExperiences((prev) =>
        prev.map((experience) =>
          experience._id === id ? response.data : experience
        )
      );
      await getAllExperiences();
      message.success("Experience updated successfully!");
    } catch (err) {
      setError("Failed to update experience", err);
      message.error("Failed to update Experience");
    } finally {
      setLoading(false);
    }
  };

  // Delete an experience
  const deleteExperience = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/experience/${id}`);
      setExperiences((prev) =>
        prev.filter((experience) => experience._id !== id)
      );
      await getAllExperiences();
      message.success("Experience deleted successfully!");
    } catch (err) {
      setError("Failed to delete experience", err);
      message.error("Failed to delete Experience");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllExperiences();
  }, []);

  return {
    experiences,
    loading,
    error,
    getAllExperiences,
    getExperienceById,
    createExperience,
    updateExperience,
    deleteExperience,
  };
};

export default useExperienceActions;
