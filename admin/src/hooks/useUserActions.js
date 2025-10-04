import { useState, useEffect } from "react";
import { message } from "antd";
import axiosInstance from "../components/Axios";

const useUserActions = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all users
  const getAllUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/users");
      setUsers(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to get users");
      message.error("Failed to get users");
    } finally {
      setLoading(false);
    }
  };

  // Get single user
  const getSingleUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/users/${id}`);
      setUser(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to get user");
      message.error("Failed to get user");
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      message.success("User deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user");
      message.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return {
    users,
    user,
    loading,
    error,
    getAllUsers,
    getSingleUser,
    deleteUser,
  };
};

export default useUserActions;
