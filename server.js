import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMongoDB } from "./src/config/dbConfig.js";
import router from "./src/router/taskRouter.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
connectMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// app.get("/", (request, response) => {
//   response.send("NOT TO DO LIST APIs");
// });

// NOT TO LIST API

app.use("/api/v1/tasks", router);

app.listen(PORT, (error) => {
  error ? console.log("ERROR in serving") : console.log("http://localhost:" + PORT + " started");
});
