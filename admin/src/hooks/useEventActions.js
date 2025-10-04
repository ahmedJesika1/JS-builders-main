import { useState, useEffect } from "react";
import { message } from "antd";
import axiosInstance from "../components/Axios";

const useEventActions = () => {
  const [events, setEvents] = useState([]); // Stores all events
  const [event, setEvent] = useState(null); // Stores a single event
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch All Events
  const getAllEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/events");
      setEvents(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to get events");
      message.error("Failed to get events");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a Single Event by ID
  const getSingleEvent = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/events/${id}`);
      setEvent(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to get event");
      message.error("Failed to get event");
    } finally {
      setLoading(false);
    }
  };

  // Create a New Event
  const createEvent = async (eventData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/events", eventData);
      setEvents((prev) => [...prev, response.data]);
      await getAllEvents();
      message.success("Event created successfully!");
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create event");
      message.error("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  // Update an Existing Event
  const updateEvent = async (id, eventData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.put(`/events/${id}`, eventData);
      setEvents((prev) => prev.map((b) => (b._id === id ? response.data : b))); // Update state
      await getAllEvents();
      message.success("Event updated successfully!");
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update event");
      message.error("Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  // Delete a Event
  const deleteEvent = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((b) => b._id !== id)); // Remove from state
      await getAllEvents();
      message.success("Event deleted successfully!");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete event");
      message.error("Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  // Auto-get events when hook is used
  useEffect(() => {
    getAllEvents();
  }, []);

  return {
    events,
    event,
    loading,
    error,
    getAllEvents,
    getSingleEvent,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};

export default useEventActions;
