"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("../config/env");
const hashPassword = async (password) => {
    const salt = await bcrypt_1.default.genSalt(env_1.env.BCRYPT_SALT_ROUNDS);
    return bcrypt_1.default.hash(password, salt);
};
exports.hashPassword = hashPassword;
