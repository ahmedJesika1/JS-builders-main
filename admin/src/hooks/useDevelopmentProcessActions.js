import { useState } from "react";
import axiosInstance from "../components/Axios";
import { useEffect } from "react";
import { message } from "antd";

const useDevelopmentProcessActions = () => {
  const [developmentProcesses, setDevelopmentProcesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all development processes
  const getAllDevelopmentProcesses = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/development-process");
      setDevelopmentProcesses(response.data.data);
    } catch (err) {
      setError("Failed to fetch development processes", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single development process by ID
  const getDevelopmentProcessById = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/development-process/${id}`);
      return response.data.data;
    } catch (err) {
      setError("Failed to fetch development process", err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new development process
  const createDevelopmentProcess = async (developmentProcessData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/development-process",
        developmentProcessData
      );
      setDevelopmentProcesses((prev) => [...prev, response.data]);
      await getAllDevelopmentProcesses();
      message.success("Development Process created successfully!");
    } catch (err) {
      setError("Failed to create development process", err);
      message.error("Failed to create Development Process");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing development process
  const updateDevelopmentProcess = async (id, developmentProcessData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        `/development-process/${id}`,
        developmentProcessData
      );
      setDevelopmentProcesses((prev) =>
        prev.map((process) => (process._id === id ? response.data : process))
      );
      await getAllDevelopmentProcesses();
      message.success("Development Process updated successfully!");
    } catch (err) {
      setError("Failed to update development process", err);
      message.error("Failed to update Development Process");
    } finally {
      setLoading(false);
    }
  };

  // Delete a development process
  const deleteDevelopmentProcess = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/development-process/${id}`);
      setDevelopmentProcesses((prev) =>
        prev.filter((process) => process._id !== id)
      );
      await getAllDevelopmentProcesses();
      message.success("Development Process deleted successfully!");
    } catch (err) {
      setError("Failed to delete development process", err);
      message.error("Failed to delete Development Process");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDevelopmentProcesses();
  }, []);

  return {
    developmentProcesses,
    loading,
    error,
    getAllDevelopmentProcesses,
    getDevelopmentProcessById,
    createDevelopmentProcess,
    updateDevelopmentProcess,
    deleteDevelopmentProcess,
  };
};

export default useDevelopmentProcessActions;
