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
exports.authLogin = exports.authSignup = void 0;
const auth_1 = require("../schema/auth");
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
// #  user signup function
const authSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = auth_1.signupValidation.safeParse(req.body);
    if (!result.success)
        return res.status(400).json({ errors: result.error.issues });
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (user)
            return res
                .status(409)
                .json({ success: false, message: "User already exist" });
        // create new user
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new user_1.default({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        yield newUser.save();
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: { firstName, lastName, email },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error,
        });
    }
});
exports.authSignup = authSignup;
// # user login function
const authLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = auth_1.loginValidation.safeParse(req.body);
    if (!result.success)
        return res.status(400).json({ errors: result.error.issues });
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (!user)
            return res
                .status(409)
                .json({ success: false, message: "Authentication failed" });
        const checkPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!checkPassword)
            return res
                .status(409)
                .json({ success: false, message: "Authentication failed" });
        if (!env_1.JWT_SECRET) {
            throw new Error("JWT_SECRET environment variable is required");
        }
        const jwtToken = jsonwebtoken_1.default.sign({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }, env_1.JWT_SECRET, { expiresIn: "24h" });
        res.status(201).json({
            success: true,
            message: "Login Successfully",
            jwtToken,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error,
        });
    }
});
exports.authLogin = authLogin;
