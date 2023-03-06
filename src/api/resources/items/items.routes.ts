import { Request, Response, Router } from "express";
import {
  addItemAsync,
  deleteItemByIdAsync,
  getAllItemsAsync,
  getItemByIdAsync,
  updateItemByIdAsync,
} from "./items.controller.js";
import { Item } from "./items.model.js";

// Setup the Express Router
const itemsRouter = Router();

// Define Routes and corresponding HTTP Methods
itemsRouter
  .route("/")
  .get(await getAllItemsAsync)
  .post(await addItemAsync);
itemsRouter
  .route("/:id")
  .get(await getItemByIdAsync)
  .put(await updateItemByIdAsync)
  .delete(await deleteItemByIdAsync);

export { itemsRouter };
