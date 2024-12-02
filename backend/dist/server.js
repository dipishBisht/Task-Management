"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const env_1 = require("./config/env");
const auth_1 = require("./middlewares/auth");
const auth_2 = __importDefault(require("./routes/auth"));
const project_1 = __importDefault(require("./routes/project"));
const app = (0, express_1.default)();
// # cors for cross origin
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
}));
// # express.json for to get json data
app.use(express_1.default.json());
// # to connect to db
(0, db_1.connectToDB)(env_1.MONGO_URL_LOCAL);
// # auth router
app.use("/auth", auth_2.default);
// # project router
app.use("/project", auth_1.checkIsAuthenticated, project_1.default);
app.listen(env_1.PORT, () => console.log(`server started on port ${env_1.PORT}`));
