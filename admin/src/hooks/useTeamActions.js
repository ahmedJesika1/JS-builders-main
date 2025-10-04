import { useState, useEffect } from "react";
import { message } from "antd";
import axiosInstance from "../components/Axios";

const useTeamActions = () => {
  const [teams, setTeams] = useState([]); // Stores all teams
  const [team, setTeam] = useState(null); // Stores a single team
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch All Teams
  const getAllTeams = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/team");
      setTeams(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to get teams");
      message.error("Failed to get teams");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a Single Team by ID
  const getSingleTeam = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/team/${id}`);
      setTeam(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to get team");
      message.error("Failed to get team");
    } finally {
      setLoading(false);
    }
  };

  // Create a New Team
  const createTeam = async (teamData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/team", teamData);
      setTeams((prev) => [...prev, response.data]);
      await getAllTeams();
      message.success("Team created successfully!");
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create team");
      message.error("Failed to create team");
    } finally {
      setLoading(false);
    }
  };

  // Update an Existing Team
  const updateTeam = async (id, teamData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.put(`/team/${id}`, teamData);
      setTeams((prev) => prev.map((b) => (b._id === id ? response.data : b))); // Update state
      await getAllTeams();
      message.success("Team updated successfully!");
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update team");
      message.error("Failed to update team");
    } finally {
      setLoading(false);
    }
  };

  // Delete a Team
  const deleteTeam = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/team/${id}`);
      setTeams((prev) => prev.filter((b) => b._id !== id)); // Remove from state
      await getAllTeams();
      message.success("Team deleted successfully!");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete team");
      message.error("Failed to delete team");
    } finally {
      setLoading(false);
    }
  };

  // Auto-get teams when hook is used
  useEffect(() => {
    getAllTeams();
  }, []);

  return {
    teams,
    team,
    loading,
    error,
    getAllTeams,
    getSingleTeam,
    createTeam,
    updateTeam,
    deleteTeam,
  };
};

export default useTeamActions;
