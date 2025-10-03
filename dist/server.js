"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const env_1 = require("./config/env");
const seedAdmin_1 = require("./seed/seedAdmin");
const PORT = env_1.env.PORT || 5000;
(async () => {
    try {
        await (0, db_1.connectDB)(); // Connect database
        await (0, seedAdmin_1.seedAdmin)(); // Seed admin user
        app_1.default.listen(PORT, () => {
            console.log(`✅ Server running at http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
})();
