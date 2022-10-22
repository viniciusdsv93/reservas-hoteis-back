import express from "express";
import cors from "cors";
import { router } from "./routes/routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

export class App {
	private express: express.Application;
	private port = process.env.PORT || 5556;

	constructor() {
		this.express = express();
		this.middlewares();
		this.documentation();
		this.routes();
		this.listen();
	}

	private middlewares() {
		this.express.use(cors());
		this.express.use(express.json());
	}

	private documentation() {
		this.express.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
	}

	private routes() {
		this.express.use(router);
	}

	private listen() {
		this.express.listen(this.port, () => {
			console.log(`Server running on http://localhost:${this.port}`);
		});
	}
}
