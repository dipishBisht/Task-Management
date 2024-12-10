"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// # Project schema
const projectSchema = new mongoose_1.default.Schema({
    projectName: {
        type: String,
        required: true,
        trim: true,
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
        validate: {
            validator: function (value) {
                return value >= new Date();
            },
            message: "Due date must be in the future.",
        },
    },
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 500,
    },
}, { timestamps: true });
// # Project model
const ProjectModel = mongoose_1.default.model("Project", projectSchema);
exports.default = ProjectModel;
