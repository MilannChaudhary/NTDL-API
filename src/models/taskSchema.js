import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  hour: {
    type: Number,
    required: true,
    min: 1,
    max: 40,
  },
  type: {
    type: String,
    default: "good",
  },
});

export const Task = mongoose.model("Task", taskSchema);

export const getTasks = async () => {
  return await Task.find();
};

export const getTaskById = async (id) => {
  return await Task.findById(id);
};

export const createTask = async (task) => {
  const newTask = new Task(task);
  return await newTask.save();
};

export const updateTask = async (id, taskobj) => {
  const data = await Task.findByIdAndUpdate(
    id,
    {
      $set: taskobj,
    },
    { new: true }
  );
  return data;
};

export const deleteTask = async (id) => {
  await Task.findByIdAndDelete(id);
};

export const searchTask = async (query, projection) => {
  const data = Task.find(query, projection);
  return data;
};
