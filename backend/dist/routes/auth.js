"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
// # user signup route
router.post("/signup", auth_1.authSignup);
// # user login route
router.post("/login", auth_1.authLogin);
exports.default = router;
