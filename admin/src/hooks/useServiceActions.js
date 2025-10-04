import { useState } from "react";
import axiosInstance from "../components/Axios";
import { useEffect } from "react";
import { message } from "antd";

const useServiceActions = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all services (optional filters object will be sent as query params)
  const getAllServices = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/service", { params: filters });
      // API returns { data: [...] } according to controller
      setServices(response.data.data);
      return response.data.data;
    } catch (err) {
      setError("Failed to fetch services", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single service by ID
  const getServiceById = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/service/${id}`);
      return response.data.data;
    } catch (err) {
      setError("Failed to fetch service", err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new service
  const createService = async (serviceData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/service", serviceData);
      setServices((prev) => [...prev, response.data]);
      await getAllServices();
      message.success("Service created successfully!");
    } catch (err) {
      setError("Failed to create service", err);
      message.error("Failed to create Service");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing service
  const updateService = async (id, serviceData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/service/${id}`, serviceData);
      setServices((prev) =>
        prev.map((service) => (service._id === id ? response.data : service))
      );
      await getAllServices();
      message.success("Service updated successfully!");
    } catch (err) {
      setError("Failed to update service", err);
      message.error("Failed to update Service");
    } finally {
      setLoading(false);
    }
  };

  // Delete a service
  const deleteService = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/service/${id}`);
      setServices((prev) => prev.filter((service) => service._id !== id));
      await getAllServices();
      message.success("Service deleted successfully!");
    } catch (err) {
      setError("Failed to delete service", err);
      message.error("Failed to delete Service");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  return {
    services,
    loading,
    error,
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
  };
};

export default useServiceActions;
