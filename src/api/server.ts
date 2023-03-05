import cors from "cors";
import express from "express";
import helmet from "helmet";
import * as middleware from "./middleware/_middlewares.js";
import { router } from "./resources/router.js";

// Instantiate the Express server
const server = express();

// Setup middleware
server.use(cors());
server.use(helmet());
server.use(express.json()); // Parse requests to json
server.use(express.urlencoded({ extended: false })); // Parse URL Encoded data

// Register and use the main resource router
server.use("/api/v1", router);

// Handle errors in Request / Response
server.use(middleware.notFound);
server.use(middleware.errorHandler);

export { server };
