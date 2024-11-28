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
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
(0, dotenv_1.config)();
const { MONGO_URL_LOCAL, PORT } = process.env;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use(express_1.default.json());
mongoose_1.default
    .connect(MONGO_URL_LOCAL)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));
const projectSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
const ProjectModel = mongoose_1.default.model("Project", projectSchema);
app.get("/get-projects", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield ProjectModel.find({});
        console.log(response);
        res.status(200).json({ status: "success", response });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ status: "error", error });
    }
}));
app.post("/create-project", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { projectName, status, priority, dueDate, owner } = req.body;
    try {
        const response = yield ProjectModel.create({
            projectName,
            status,
            priority,
            dueDate,
            owner,
        });
        res.status(200).json({ status: "success", response });
    }
    catch (error) {
        res.status(400).json({ status: "error", error });
    }
}));
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
