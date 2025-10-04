import { useState } from "react";
import axiosInstance from "../components/Axios";
import { useEffect } from "react";
import { message } from "antd";

const useOurValuesActions = () => {
  const [ourValues, setOurValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all our values
  const getAllOurValues = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/our-values");
      setOurValues(response.data.data);
    } catch (err) {
      setError("Failed to fetch our values", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single our value by ID
  const getOurValueById = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/our-values/${id}`);
      return response.data.data;
    } catch (err) {
      setError("Failed to fetch our value", err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new our value
  const createOurValue = async (ourValueData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/our-values", ourValueData);
      setOurValues((prev) => [...prev, response.data]);
      await getAllOurValues();
      message.success("Our values created successfully!");
    } catch (err) {
      setError("Failed to create our value", err);
      message.error("Failed to create Our values");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing our value
  const updateOurValue = async (id, ourValueData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        `/our-values/${id}`,
        ourValueData
      );
      setOurValues((prev) =>
        prev.map((value) => (value._id === id ? response.data : value))
      );
      await getAllOurValues();
      message.success("Our values updated successfully!");
    } catch (err) {
      setError("Failed to update our value", err);
      message.error("Failed to update Our values");
    } finally {
      setLoading(false);
    }
  };

  // Delete an our value
  const deleteOurValue = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/our-values/${id}`);
      setOurValues((prev) => prev.filter((value) => value._id !== id));
      await getAllOurValues();
      message.success("Our values deleted successfully!");
    } catch (err) {
      setError("Failed to delete our value", err);
      message.error("Failed to delete Our values");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOurValues();
  }, []);

  return {
    ourValues,
    loading,
    error,
    getAllOurValues,
    getOurValueById,
    createOurValue,
    updateOurValue,
    deleteOurValue,
  };
};

export default useOurValuesActions;
