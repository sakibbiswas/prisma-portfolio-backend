"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const error_middleware_1 = require("./middlewares/error.middleware");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const blog_routes_1 = __importDefault(require("./modules/blog/blog.routes"));
const project_routes_1 = __importDefault(require("./modules/project/project.routes"));
const app = (0, express_1.default)();
// Helmet (disable cross-origin restrictions for simplicity)
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false,
}));
// Global CORS for API
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // frontend URL
    credentials: true,
}));
// Other middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/blogs", blog_routes_1.default);
app.use("/api/projects", project_routes_1.default);
// ✅ Serve static uploads with proper CORS headers
const uploadsPath = path_1.default.resolve(__dirname, "..", "uploads");
app.use("/uploads", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use("/uploads", express_1.default.static(uploadsPath, { dotfiles: "allow" }));
// Health check
app.get("/", (_req, res) => {
    res.status(200).json({ status: "ok", message: "Server is running 🚀" });
});
// Global error handler
app.use(error_middleware_1.errorHandler);
exports.default = app;
