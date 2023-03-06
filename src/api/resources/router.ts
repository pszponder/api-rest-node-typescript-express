/**
 * This file imports all routers from the different resources
 * and exports a single express router
 * which can be consumed by the server module
 */

import { Router } from "express";
import { itemsRouter } from "./items/items.routes.js";

/**
 * The Router is responsible for accepting requests and sending responses
 * for a particular route
 *
 * Typically, the router will use a controller for handling logic sent to it
 */

// Setup the Express Router
const router = Router();

// Import resource routers
router.use("/items", itemsRouter);

export { router };
