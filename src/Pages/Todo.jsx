import { styled } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { green, blue } from "@mui/material/colors";

const useStyles = styled((theme) => ({
  root: {
    flexGrow: 1,
  },
  appTitle: {
    flexGrow: 1,
  },
  listItem: {
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  completedTask: {
    textDecoration: "line-through",
    color: theme.palette.text.secondary,
  },
}));

function TodoApp() {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [dueDateInput, setDueDateInput] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDueDateInputChange = (event) => {
    setDueDateInput(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== "" && dueDateInput.trim() !== "") {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: inputValue,
          completed: false,
          dueDate: new Date(dueDateInput),
        },
      ]);
      setInputValue("");
      setDueDateInput("");
    }
  };

  const handleToggleTask = (taskId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setEditTaskId(taskId);
      setEditValue(taskToEdit.text);
      setDueDateInput(taskToEdit.dueDate.toISOString().substring(0, 16));
    }
  };

  const handleSaveEdit = () => {
    setTasks(
      tasks.map((task) => {
        if (task.id === editTaskId) {
          return { ...task, text: editValue, dueDate: new Date(dueDateInput) };
        }
        return task;
      })
    );
    setEditTaskId(null);
    setEditValue("");
    setDueDateInput("");
  };

  const handleCancelEdit = () => {
    setEditTaskId(null);
    setEditValue("");
    setDueDateInput("");
  };

  const handleDeleteTask = (taskId) => {
    console.log({taskId})
    const taskData = tasks.filter((task) => task.id !== taskId);   
    console.log({taskData})
    setTasks(taskData);
  };
console.log("tasks", tasks);
  useEffect(() => {
    console.log({tasks})
    if (tasks.length > 0) {
      const interval = setInterval(() => {
        setTasks(
          tasks.map((task) => {
            if (!task.completed && task.dueDate > new Date()) {
              const timeDiff = Math.abs(task.dueDate - new Date());
              const timeRemaining = Math.ceil(timeDiff / 1000); // in seconds
              return { ...task, timeRemaining };
            }
            return task;
          })
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [tasks]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.appTitle}>
            To-Do App
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" style={{ marginTop: "20px" }}>
        <TextField
          label="Add Task"
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleAddTask();
            }
          }}
        />
        <TextField
          label="Due Date & Time"
          type="datetime-local"
          variant="outlined"
          fullWidth
          value={dueDateInput}
          onChange={handleDueDateInputChange}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginTop: "10px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTask}
          style={{ marginTop: "10px", width: "100%" }}
        >
          Add
        </Button>
        <List style={{ marginTop: "20px" }}>
          {tasks.map((task, index) => (
            <ListItem
              key={index}
              dense
              button
              // onClick={() => handleToggleTask(task.id)}
              className={classes.listItem}
            >
              <Checkbox
                edge="start"
                checked={task.completed}
                tabIndex={-1}
                disableRipple
                color="primary"
                onClick={() => handleToggleTask(task.id)}
              />
              {editTaskId === task.id ? (
                <>
                  <TextField
                    fullWidth
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <TextField
                    type="datetime-local"
                    fullWidth
                    value={dueDateInput}
                    onChange={handleDueDateInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ marginTop: "10px" }}
                  />
                  <Button onClick={handleSaveEdit} color="primary">
                    Save
                  </Button>
                  <Button onClick={handleCancelEdit} color="secondary">
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <ListItemText
                    primary={task.text}
                    secondary={
                      task.timeRemaining ? formatDueDate(task.dueDate) : "Time Expired"
                    }
                    className={task.completed ? classes.completedTask : ""}
                  />
                  <ListItemSecondaryAction sx={{ zIndex: 1000 }}>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEditTask(task.id)}
                    >
                      <EditIcon style={{ color: blue[500] }} />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <DeleteIcon style={{ color: green[500] }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
}

function formatDueDate(dueDate) {
  const currentDate = new Date();
  const diffTime = Math.abs(dueDate - currentDate);
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

  if (diffHours >= 24) {
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 1) {
      return `${diffDays} days remaining`;
    } else {
      return "1 day remaining";
    }
  } else {
    return `${diffHours}:${diffMinutes.toString().padStart(2, "0")}:${diffSeconds
      .toString()
      .padStart(2, "0")} remaining`;
  }
}

export default TodoApp;
