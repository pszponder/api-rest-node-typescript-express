/**
 * This file imports all routers from the different resources
 * and exports a single express router
 * which can be consumed by the server module
 */

import express from "express";
import { IMessageResponse } from "../interfaces/IMessageResponse.js";

/**
 * The Router is responsible for accepting requests and sending responses
 * for a particular route
 *
 * Typically, the router will use a controller for handling logic sent to it
 */

// Setup the Express Router
const router = express.Router();

router.get<{}, IMessageResponse>("/", (req, res) => {
  res.json({
    message: "API - Hello!",
  });
});

// TODO: Import resource routers HERE
// router.use('/resource-endpoint', resource-router)

export { router };
