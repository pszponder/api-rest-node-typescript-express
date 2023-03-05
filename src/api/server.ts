import cors from "cors";
import express from "express";
import helmet from "helmet";
import { IMessageResponse } from "./interfaces/IMessageResponse.js";
import * as middleware from "./middleware";

// Instantiate the Express server
const server = express();

// Setup middleware
server.use(cors());
server.use(helmet());
server.use(express.json()); // Parse requests to json
server.use(express.urlencoded({ extended: false })); // Parse URL Encoded data

// Setup simple get route
server.get<{}, IMessageResponse>("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

// TODO: Add resource routers here from the "api" directory

// Handle errors
server.use(middleware.notFound);
server.use(middleware.errorHandler);

export { server };
