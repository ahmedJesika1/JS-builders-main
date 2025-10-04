import { useState } from "react";
import axiosInstance from "../components/Axios";
import { useEffect } from "react";
import { message } from "antd";

const useBrochureActions = () => {
  const [brochures, setBrochures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all brochures
  const getAllBrochures = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/brochure");
      setBrochures(response.data.data);
    } catch (err) {
      setError("Failed to fetch brochures", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single brochure by ID
  const getBrochureById = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/brochure/${id}`);
      return response.data.data;
    } catch (err) {
      setError("Failed to fetch brochure", err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new brochure
  const createBrochure = async (brochureData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/brochure", brochureData);
      setBrochures((prev) => [...prev, response.data]);
      await getAllBrochures();
      message.success("Brochure created successfully!");
    } catch (err) {
      setError("Failed to create brochure", err);
      message.error("Failed to create Brochure");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing brochure
  const updateBrochure = async (id, brochureData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/brochure/${id}`, brochureData);
      setBrochures((prev) =>
        prev.map((brochure) => (brochure._id === id ? response.data : brochure))
      );
      await getAllBrochures();
      message.success("Brochure updated successfully!");
    } catch (err) {
      setError("Failed to update brochure", err);
      message.error("Failed to update Brochure");
    } finally {
      setLoading(false);
    }
  };

  // Delete a brochure
  const deleteBrochure = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/brochure/${id}`);
      setBrochures((prev) => prev.filter((brochure) => brochure._id !== id));
      await getAllBrochures();
      message.success("Brochure deleted successfully!");
    } catch (err) {
      setError("Failed to delete brochure", err);
      message.error("Failed to delete Brochure");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBrochures();
  }, []);

  return {
    brochures,
    loading,
    error,
    getAllBrochures,
    getBrochureById,
    createBrochure,
    updateBrochure,
    deleteBrochure,
  };
};

export default useBrochureActions;
