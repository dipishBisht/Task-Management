"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
// # To check is user authenticated 
const checkIsAuthenticated = (req, res, next) => {
    const auth = req.headers["authorization"];
    if (!auth)
        return res.status(403).json({ message: "Unauthorized" });
    try {
        if (!env_1.JWT_SECRET)
            throw new Error("JWT_SECRET environment variable is required");
        const decoded = jsonwebtoken_1.default.verify(auth, env_1.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: "Unauthorized" });
    }
};
exports.checkIsAuthenticated = checkIsAuthenticated;
