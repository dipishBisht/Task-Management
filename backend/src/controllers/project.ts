import { Request, Response } from "express";
import ProjectModel from "../models/project";
import { projectSchema } from "../schema/project";

// # function to get projects

export const getProjects = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const projects = await ProjectModel.find({ owner: user["_id"] });
    if (!projects)
      return res.status(401).json({ message: "No projects found" });
    return res.status(201).json({ success: true, projects });
  } catch (error) {
    return res.status(409).json({ message: "Internal server error" });
  }
};

export const createProject = async (req: Request, res: Response) => {
  const { projectName, status, priority, dueDate } = req.body;
  const owner = req.user?._id;
  const result = projectSchema.safeParse({
    projectName,
    status,
    priority,
    dueDate,
    owner,
  });
  if (!result.success)
    return res.status(400).json({ errors: result.error.issues });
  try {
    const project = await ProjectModel.find({ projectName });
    if (project.length)
      return res
        .status(400)
        .json({ success: false, message: "Project with name alreay exist" });
    const response = await ProjectModel.create({
      projectName,
      status,
      priority,
      dueDate,
      owner,
    });
    res.status(201).json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
