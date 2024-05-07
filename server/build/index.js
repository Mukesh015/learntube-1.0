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
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const video_1 = __importDefault(require("./routes/video"));
const static_1 = __importDefault(require("./routes/static"));
const feature_1 = __importDefault(require("./routes/feature"));
const dotenv_1 = __importDefault(require("dotenv"));
const graphql_1 = __importDefault(require("./graphql"));
dotenv_1.default.config({ path: "./.env" });
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const DB = process.env.DB;
        const PORT = process.env.PORT;
        if (!DB || !PORT) {
            console.error("Environment variables DB and PORT must be provided.");
            return;
        }
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use(body_parser_1.default.json());
        app.use((0, cookie_parser_1.default)());
        app.use("/graphql", (0, express4_1.expressMiddleware)(yield (0, graphql_1.default)()));
        app.use("/api", static_1.default);
        app.use("/video", video_1.default);
        app.use("/features", feature_1.default);
        try {
            yield mongoose_1.default.connect(DB);
            console.log("DB connected");
        }
        catch (error) {
            console.log("DB connection failed", error);
        }
        app.listen(PORT, () => {
            console.log(`server is running on http://localhost:${PORT}`);
        });
    });
}
init();
