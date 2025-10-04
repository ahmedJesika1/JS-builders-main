import { useState, useEffect } from "react";
import { message } from "antd";
import axiosInstance from "../components/Axios";

const useAmenityActions = () => {
  const [amenities, setAmenities] = useState([]); // Stores all amenities
  const [amenity, setAmenity] = useState(null); // Stores a single amenity
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch All Amenities
  const getAllAmenities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/amenities");
      setAmenities(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to get amenities");
      message.error("Failed to get amenities");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a Single Amenity by ID
  const getSingleAmenity = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/amenities", amenityData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAmenity(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to get amenity");
      message.error("Failed to get amenity");
    } finally {
      setLoading(false);
    }
  };

  // Create a New Amenity
  const createAmenity = async (amenityData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/amenities", amenityData);
      setAmenities((prev) => [...prev, response.data]);
      await getAllAmenities();
      message.success("Amenity created successfully!");
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create amenity");
      message.error("Failed to create amenity");
    } finally {
      setLoading(false);
    }
  };

  // Update an Existing Amenity
  const updateAmenity = async (id, amenityData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.put(`/amenities/${id}`, amenityData);
      setAmenities((prev) =>
        prev.map((a) => (a._id === id ? response.data : a))
      ); // Update state
      await getAllAmenities();
      message.success("Amenity updated successfully!");
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update amenity");
      message.error("Failed to update amenity");
    } finally {
      setLoading(false);
    }
  };

  // Delete an Amenity
  const deleteAmenity = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/amenities/${id}`);
      setAmenities((prev) => prev.filter((a) => a._id !== id)); // Remove from state
      await getAllAmenities();
      message.success("Amenity deleted successfully!");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete amenity");
      message.error("Failed to delete amenity");
    } finally {
      setLoading(false);
    }
  };

  // Auto-get amenities when hook is used
  useEffect(() => {
    getAllAmenities();
  }, []);

  return {
    amenities,
    amenity,
    loading,
    error,
    getAllAmenities,
    getSingleAmenity,
    createAmenity,
    updateAmenity,
    deleteAmenity,
  };
};

export default useAmenityActions;
