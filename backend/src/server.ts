import { config } from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";

config();
const { MONGO_URL_LOCAL, PORT } = process.env;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

mongoose
  .connect(MONGO_URL_LOCAL!)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["In Progress", "Not Started", "Done"],
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Project", projectSchema);

app.get("/get-projects", async (req, res) => {
  try {
    const response = await ProjectModel.find({});
    console.log(response);
    res.status(200).json({ status: "success", response });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", error });
    
  }
});
app.post("/create-project", async (req, res) => {
  console.log(req.body);
  const { projectName, status, priority, dueDate, owner } = req.body;

  try {
    const response = await ProjectModel.create({
      projectName,
      status,
      priority,
      dueDate,
      owner,
    });
    res.status(200).json({ status: "success", response });
  } catch (error) {
    res.status(400).json({ status: "error", error });
  }
});

app.listen(PORT!, () => console.log(`server started on port ${PORT}`));
