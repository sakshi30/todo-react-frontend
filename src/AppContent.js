// AppContent.js
import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, CssBaseline } from "@mui/material";
import TaskForm from "./Tasks/TaskForm";
import TaskFilter from "./Tasks/TaskFilter";
import TaskList from "./Tasks/TaskList";
import "./App.css"; // Import your custom CSS file
import { fetchTasks } from "./services/tasks.service";

const AppContent = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // Fetch tasks from the backend when the component mounts
    fetchTaskData();
  }, []);

  const fetchTaskData = async () => {
    try {
      const tasksData = await fetchTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (newTask) => {
    try {
     // Update the local state with the newly added task
     setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateStatus = async (updatedTask) => {
    try {
      // Update the local state with the updated task
      setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      // Update the local state by removing the deleted task
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTasks = filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Paper elevation={3} className="app-container">
        <Typography variant="h4" align="center" gutterBottom>
          Task Management App
        </Typography>
        <TaskForm onAddTask={addTask} />
        <TaskFilter onChangeFilter={changeFilter} />
        <TaskList allTasks={filteredTasks} onUpdateStatus={updateStatus} onDeleteTask={deleteTask} />
      </Paper>
    </Container>
  );
};

export default AppContent;
