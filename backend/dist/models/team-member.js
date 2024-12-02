"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// # team member schema
const teamMemberSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        requied: true,
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    projectId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
}, {
    timestamps: true,
});
// # team member model
const TeamMemberModel = mongoose_1.default.model("TeamMember", teamMemberSchema);
exports.default = TeamMemberModel;
