import { useState, useEffect } from "react";
import { message } from "antd";
import axiosInstance from "../components/Axios";

const useClientActions = () => {
  const [clients, setClients] = useState([]); // Stores all clients
  const [client, setClient] = useState(null); // Stores a single client
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch All Clients
  const getAllClients = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/client");
      setClients(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to get clients");
      message.error("Failed to get clients");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a Single Client by ID
  const getSingleClient = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/client/${id}`);
      setClient(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to get client");
      message.error("Failed to get client");
    } finally {
      setLoading(false);
    }
  };

  // Create a New Client
  const createClient = async (clientData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/client", clientData);
      setClients((prev) => [...prev, response.data]);
      await getAllClients();
      message.success("Client created successfully!");
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create client");
      message.error("Failed to create client");
    } finally {
      setLoading(false);
    }
  };

  // Update an Existing Client
  const updateClient = async (id, clientData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.put(`/client/${id}`, clientData);
      setClients((prev) =>
        prev.map((b) => (b._id === id ? response.data : b))
      );
      await getAllClients();
      message.success("Client updated successfully!");
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update client");
      message.error("Failed to update client");
    } finally {
      setLoading(false);
    }
  };

  // Delete a Client
  const deleteClient = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/client/${id}`);
      setClients((prev) => prev.filter((b) => b._id !== id));
      await getAllClients();
      message.success("Client deleted successfully!");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete client");
      message.error("Failed to delete client");
    } finally {
      setLoading(false);
    }
  };

  // Auto-get clients when hook is used
  useEffect(() => {
    getAllClients();
  }, []);

  return {
    clients,
    client,
    loading,
    error,
    getAllClients,
    getSingleClient,
    createClient,
    updateClient,
    deleteClient,
  };
};

export default useClientActions;
