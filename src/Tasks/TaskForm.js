// TaskForm.js
import React, { useState } from "react";
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import "./css/TaskForm.css"; // Import your custom CSS file
import { addTask } from "../services/tasks.service";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [error, setError] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setError("");
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title) {
      setError('Title is required.');
      return;
    }

    const newTask = {
      title,
      description,
      status,
    };

    try {
      // Add the new task using the addTask service function
      const addedTask = await addTask(newTask);

      // Trigger any additional actions, if needed
      onAddTask(addedTask);

      // Reset form fields
      setTitle('');
      setDescription('');
      setStatus('To Do');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <TextField label="Title" variant="outlined" value={title} onChange={handleTitleChange} fullWidth margin="normal" />
      <TextField
        label="Description"
        variant="outlined"
        value={description}
        onChange={handleDescriptionChange}
        multiline
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Status</InputLabel>
        <Select value={status} onChange={handleStatusChange} label="Status">
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
      </FormControl>
      {error && <p className="error-message">{error}</p>}
      <Button type="submit" variant="contained" color="primary">
        Add Task
      </Button>
    </form>
  );
};

export default TaskForm;
