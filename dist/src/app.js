"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes/routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
class App {
    constructor() {
        this.port = process.env.PORT || 5556;
        this.express = (0, express_1.default)();
        this.middlewares();
        this.documentation();
        this.routes();
        this.listen();
    }
    middlewares() {
        this.express.use((0, cors_1.default)());
        this.express.use(express_1.default.json());
    }
    documentation() {
        this.express.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    }
    routes() {
        this.express.use(routes_1.router);
    }
    listen() {
        this.express.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`);
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map