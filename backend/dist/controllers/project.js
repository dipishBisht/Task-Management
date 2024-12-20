"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.editBasicDetails = exports.createProject = exports.getProjects = void 0;
const project_1 = __importDefault(require("../models/project"));
const project_2 = require("../schema/project");
// # function to get projects
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        const projects = yield project_1.default.find({ owner: user["_id"] });
        if (!projects)
            return res.status(401).json({ message: "No projects found" });
        return res.status(201).json({ success: true, projects });
    }
    catch (error) {
        return res.status(409).json({ message: "Internal server error" });
    }
});
exports.getProjects = getProjects;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { projectName, status, priority, dueDate, description } = req.body;
    const owner = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const result = project_2.projectSchema.safeParse({
        projectName,
        status,
        priority,
        dueDate,
        owner,
        description,
    });
    if (!result.success)
        return res.status(400).json({ errors: result.error.issues });
    try {
        const project = yield project_1.default.findOne({ projectName, owner });
        if (project)
            return res
                .status(401)
                .json({ success: false, message: "Project with name alreay exist" });
        const response = yield project_1.default.create({
            projectName,
            status,
            priority,
            dueDate,
            owner,
            description,
        });
        return res.status(201).json({
            success: true,
            data: response,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});
exports.createProject = createProject;
const editBasicDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { projectName, status, priority, dueDate, description, projectId } = req.body;
    const owner = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const result = project_2.projectSchema.safeParse({
        projectName,
        status,
        priority,
        dueDate,
        owner,
        description,
    });
    if (!result.success)
        return res.status(400).json({ errors: result.error.issues });
    try {
        const response = yield project_1.default.findByIdAndUpdate(projectId, {
            projectName,
            status,
            priority,
            dueDate,
            owner,
            description,
        }, { new: true });
        console.log(response);
        return res.status(201).json({
            success: true,
            data: response,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});
exports.editBasicDetails = editBasicDetails;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield project_1.default.findByIdAndDelete(id);
        res
            .status(200)
            .json({ success: true, message: "Project deleted successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Failed to delete project" });
    }
});
exports.deleteProject = deleteProject;
