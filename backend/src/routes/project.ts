import { Router } from "express";
import { createProject, getProjects } from "../controllers/project";

const router = Router();


// # route to get logged in user projects

router.get("/get-project",getProjects)

router.post("/create-project",createProject)

export default router;
