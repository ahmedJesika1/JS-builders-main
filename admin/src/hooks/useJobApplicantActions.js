import { useState } from "react";
import axiosInstance from "../components/Axios";
import { useEffect } from "react";
import { message } from "antd";

const useJobApplicantActions = () => {
  const [jobApplicants, setJobApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all jobApplicants
  const getAllJobApplicants = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/job-applicants");
      setJobApplicants(response.data.data);
    } catch (err) {
      setError("Failed to fetch jobApplicants", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single jobApplicant by ID
  const getJobApplicantById = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/job-applicants/${id}`);
      return response.data.data;
    } catch (err) {
      setError("Failed to fetch jobApplicant", err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new jobApplicant
  const createJobApplicant = async (jobApplicantData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/job-applicants", jobApplicantData);
      setJobApplicants((prev) => [...prev, response.data]);
      await getAllJobApplicants();
      message.success("JobApplicant created successfully!");
    } catch (err) {
      setError("Failed to create jobApplicant", err);
      message.error("Failed to create JobApplicant");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing jobApplicant
  const updateJobApplicant = async (id, jobApplicantData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/job-applicants/${id}`, jobApplicantData);
      setJobApplicants((prev) =>
        prev.map((jobApplicant) => (jobApplicant._id === id ? response.data : jobApplicant))
      );
      await getAllJobApplicants();
      message.success("JobApplicant updated successfully!");
    } catch (err) {
      setError("Failed to update jobApplicant", err);
      message.error("Failed to update JobApplicant");
    } finally {
      setLoading(false);
    }
  };

  // Delete a jobApplicant
  const deleteJobApplicant = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/job-applicants/${id}`);
      setJobApplicants((prev) => prev.filter((jobApplicant) => jobApplicant._id !== id));
      await getAllJobApplicants();
      message.success("JobApplicant deleted successfully!");
    } catch (err) {
      setError("Failed to delete jobApplicant", err);
      message.error("Failed to delete JobApplicant");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllJobApplicants();
  }, []);

  return {
    jobApplicants,
    loading,
    error,
    getAllJobApplicants,
    getJobApplicantById,
    createJobApplicant,
    updateJobApplicant,
    deleteJobApplicant,
  };
};

export default useJobApplicantActions;
