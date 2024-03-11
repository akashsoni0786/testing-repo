// src/AddTaskModal.js
import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const AddTaskModal = ({ isOpen, handleClose, handleAddTask }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");

  const handleAddButtonClick = () => {
    // Validate and add task logic
    if (taskTitle.trim() === "") {
      // Handle validation error (e.g., show an error message)
      return;
    }

    // Add task
    handleAddTask({
      title: taskTitle,
      description: taskDescription,
      priority: taskPriority,
    });

    // Reset form values
    setTaskTitle("");
    setTaskDescription("");
    setTaskPriority("Medium");

    // Close the modal
    handleClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose} aria-labelledby="add-task-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" id="add-task-modal">
          Add Task
        </Typography>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            id="priority-select"
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
            label="Priority"
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleAddButtonClick}>
          Add
        </Button>
      </Box>
    </Modal>
  );
};

export default AddTaskModal;
