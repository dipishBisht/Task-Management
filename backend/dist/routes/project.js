"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_1 = require("../controllers/project");
const router = (0, express_1.Router)();
// # route to get logged in user projects
router.get("/get-project", project_1.getProjects);
router.post("/create-project", project_1.createProject);
router.put("/edit-basic-details", project_1.editBasicDetails);
router.delete("/:id", project_1.deleteProject);
exports.default = router;
