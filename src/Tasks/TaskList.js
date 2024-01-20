// TaskList.js
import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Button } from "@mui/material";
import "./css/TaskList.css"; // Import your custom CSS file
import { getNextStatus } from "../common";
import { fetchTasks, updateTask, deleteTask } from "../services/tasks.service";

const TaskList = ({ allTasks, onUpdateStatus, onDeleteTask }) => {
  const [tasks, setTasks] = useState(allTasks);

  useEffect(() => {
    // Fetch tasks from the backend when the component mounts
    fetchTaskData();
  }, []);

  useEffect(() => {
    // Fetch tasks from the backend when the component mounts
    fetchTaskData();
  }, []);

  useEffect(() => {
    setTasks(allTasks);
  }, [allTasks]);

  const fetchTaskData = async () => {
    try {
      const tasksData = await fetchTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleUpdateStatus = async (taskId) => {
    try {
      // Get the next status using your getNextStatus function
      const nextStatus = getNextStatus(tasks.find((task) => task._id === taskId).status);

      // Update the task with the new status
      const updatedTask = await updateTask(taskId, { status: nextStatus });

      // Update the local state with the updated task
      setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)));

      // Trigger any additional actions, if needed
      onUpdateStatus(updatedTask);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      // Delete the task
      await deleteTask(taskId);

      // Update the local state by removing the deleted task
      setTasks(tasks.filter((task) => task._id !== taskId));

      // Trigger any additional actions, if needed
      onDeleteTask(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <List>
      {tasks.length > 0 &&
        tasks?.map((task) => (
          <ListItem key={task._id} className="task-item">
            <ListItemText
              primary={task.title}
              secondary={
                <React.Fragment>
                  <span>{task.description}</span>
                  <br />
                  <span>Status: {task.status}</span>
                </React.Fragment>
              }
            />
            <div className="task-actions">
              <Button variant="contained" className="updateStatus" onClick={() => handleUpdateStatus(task._id)}>
                Change to {getNextStatus(task.status)}
              </Button>
              <Button variant="contained" className="delete" onClick={() => handleDeleteTask(task._id)}>
                Delete
              </Button>
            </div>
          </ListItem>
        ))}
    </List>
  );
};

export default TaskList;
