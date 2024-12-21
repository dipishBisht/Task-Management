import { Router } from "express";
import { createProject, getProjects,editBasicDetails,deleteProject } from "../controllers/project";

const router = Router();


// # route to get logged in user projects

router.get("/get-project",getProjects)

router.post("/create-project",createProject)

router.put("/edit-basic-details",editBasicDetails)

router.delete("/:id",deleteProject)
export default router;
