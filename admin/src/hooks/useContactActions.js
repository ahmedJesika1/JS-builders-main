import { useState } from "react";
import axiosInstance from "../components/Axios";
import { useEffect } from "react";
import { message } from "antd";

const useContactActions = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all contacts
  const getAllContacts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/contact");
      setContacts(response.data.data);
    } catch (err) {
      setError("Failed to fetch contacts", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single contact by ID
  const getContactById = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/contact/${id}`);
      return response.data.data;
    } catch (err) {
      setError("Failed to fetch contact", err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new contact
  const createContact = async (contactData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/contact", contactData);
      setContacts((prev) => [...prev, response.data]);
      await getAllContacts();
      message.success("Contact created successfully!");
    } catch (err) {
      setError("Failed to create contact", err);
      message.error("Failed to create Contact");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing contact
  const updateContact = async (id, contactData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/contact/${id}`, contactData);
      setContacts((prev) =>
        prev.map((contact) => (contact._id === id ? response.data : contact))
      );
      await getAllContacts();
      message.success("Contact updated successfully!");
    } catch (err) {
      setError("Failed to update contact", err);
      message.error("Failed to update Contact");
    } finally {
      setLoading(false);
    }
  };

  // Delete a contact
  const deleteContact = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/contact/${id}`);
      setContacts((prev) => prev.filter((contact) => contact._id !== id));
      await getAllContacts();
      message.success("Contact deleted successfully!");
    } catch (err) {
      setError("Failed to delete contact", err);
      message.error("Failed to delete Contact");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  return {
    contacts,
    loading,
    error,
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
  };
};

export default useContactActions;
