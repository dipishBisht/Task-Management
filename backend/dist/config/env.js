"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.MONGO_URL_LOCAL = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// # All .env variables
_a = process.env, exports.PORT = _a.PORT, exports.MONGO_URL_LOCAL = _a.MONGO_URL_LOCAL, exports.JWT_SECRET = _a.JWT_SECRET;
