// src/KanbanBoard.js
import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Chip,
  AppBar,
  Toolbar,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AddTaskModal from "./AddTask";

const initialTasks = {
  todo: [
    { id: "1", title: "Task 1", description: "Description for Task 1", priority: "High" },
    { id: "2", title: "Task 2", description: "Description for Task 2", priority: "Medium" },
    { id: "3", title: "Task 3", description: "Description for Task 3", priority: "Low" },
  ],
  inProgress: [
    { id: "4", title: "Task 4", description: "Description for Task 4", priority: "Medium" },
    { id: "5", title: "Task 5", description: "Description for Task 5", priority: "High" },
  ],
  done: [
    { id: "6", title: "Task 6", description: "Description for Task 6", priority: "Low" },
    { id: "7", title: "Task 7", description: "Description for Task 7", priority: "High" },
  ],
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleAddTask = () => {
    // Implement logic to add tasks
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId === destination.droppableId) {
      // Moving within the same column
      const updatedTasks = { ...tasks };
      const columnTasks = [...updatedTasks[source.droppableId]];
      const [movedTask] = columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 0, movedTask);
      updatedTasks[source.droppableId] = columnTasks;
      setTasks(updatedTasks);
    } else {
      // Moving to a different column
      const updatedTasks = { ...tasks };
      const sourceColumnTasks = [...updatedTasks[source.droppableId]];
      const destinationColumnTasks = [...updatedTasks[destination.droppableId]];

      const [movedTask] = sourceColumnTasks.splice(source.index, 1);
      destinationColumnTasks.splice(destination.index, 0, movedTask);

      updatedTasks[source.droppableId] = sourceColumnTasks;
      updatedTasks[destination.droppableId] = destinationColumnTasks;

      setTasks(updatedTasks);
    }
  };

  return (
    <div>
      <AddTaskModal 
      isOpen={true}
      />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Kanban Board</Typography>
          <Button color="inherit" onClick={handleAddTask}>
            Add Task
          </Button>
        </Toolbar>
      </AppBar>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={3} mt={2}>
          {Object.keys(tasks).map((column) => (
            <Grid item key={column} xs={4}>
              <Paper elevation={3}>
                <Box p={2}>
                  <Typography variant="h5">{column.toUpperCase()}</Typography>
                  <Droppable droppableId={column} key={column}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {tasks[column].map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{ marginBottom: "8px" }}
                              >
                                <Card>
                                  <CardContent>
                                    <Typography variant="h6">{task.title}</Typography>
                                    <Typography color="textSecondary">
                                      {task.description}
                                    </Typography>
                                    <Chip
                                      label={task.priority}
                                      color={
                                        task.priority === "High"
                                          ? "error"
                                          : task.priority === "Medium"
                                          ? "warning"
                                          : "primary"
                                      }
                                    />
                                  </CardContent>
                                </Card>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
