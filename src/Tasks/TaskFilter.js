// TaskFilter.js
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './css/TaskFilter.css'; // Import your custom CSS file

const TaskFilter = ({ onChangeFilter }) => {
  return (
    <div className="task-filter">
      <FormControl fullWidth variant="outlined">
        <InputLabel>Filter by Status:</InputLabel>
        <Select
          label="Filter by Status"
          onChange={(e) => onChangeFilter(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default TaskFilter;
