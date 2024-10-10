import express from "express";
import { createTask, getTaskById, getTasks, Task, updateTask, deleteTask } from "../models/taskSchema.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const taskData = await getTasks();

  const successObj = {
    status: "success",
    message: "Task List fetched!",
    data: taskData,
  };

  return res.status(200).send(successObj);

  res.send("GET TASK");
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const taskData = await getTaskById(id);

  const successObj = {
    status: "success",
    message: "Task fetched!",
    data: taskData,
  };

  res.status(200).send(successObj);
});

router.post("/", async (req, res) => {
  try {
    const { task, hour, type } = req.body;

    // can send req.body

    const savedData = await createTask({
      task,
      hour,
      type,
    });

    const successObj = {
      status: "success",
      message: "Task createdd successfully!",
      data: savedData,
    };

    res.status(200).send(successObj);
  } catch (error) {
    console.log(error);
    const errorObj = {
      status: "error",
      message: "Error creating new task",
    };

    res.status(500).send(errorObj);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { task, hour, type } = req.body;

  if (task && hour && type) {
    const taskData = await updateTask(id, {
      task,
      hour,
      type,
    });

    const successObj = {
      status: "success",
      message: "Task update successfully!",
      data: taskData,
    };

    res.status(200).send(successObj);
  } else {
    let errorObj = {
      status: "error",
      message: "Cannot PUT update",
    };

    res.status(400).send(errorObj);
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { task, hour, type } = req.body;

  //   const updateData = {};
  //   if (task) {
  //     updateData.task = task;
  //   }
  //   if (hour) {
  //     updateData.hour = hour;
  //   }
  //   if (type) {
  //     updateData.type = type;
  //   }
  const updatedData = { ...req.body };
  // can send req.body
  const taskData = await updateTask(id, updatedData);

  const successObj = {
    status: "success",
    message: "Task update successfully!",
    data: taskData,
  };

  res.status(200).send(successObj);
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // await Task.deleteOne({ _id: id });
    await deleteTask(id);

    const successObj = {
      status: "success",
      message: "Task " + id + "deleted!",
    };

    res.status(200).send(successObj);
  } catch (error) {
    const errorObj = {
      status: "error",
      message: "Error deleting task",
    };

    res.status(500).send(errorObj);
  }
});

export default router;
