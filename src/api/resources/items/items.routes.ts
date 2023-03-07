import { Router } from "express";
import { validateRequest } from "../../middleware/_middlewares.js";
import {
  addItemAsync,
  deleteItemByIdAsync,
  getAllItemsAsync,
  getItemByIdAsync,
  updateItemByIdAsync,
} from "./items.controller.js";
import { Item, ParamsWithId } from "./items.model.js";

// Setup the Express Router
const itemsRouter = Router();

// Define Routes and corresponding HTTP Methods
itemsRouter
  .route("/")
  .get(validateRequest({}), await getAllItemsAsync)
  .post(validateRequest({ body: Item }), await addItemAsync);

itemsRouter
  .route("/:id")
  .get(validateRequest({ params: ParamsWithId }), await getItemByIdAsync)
  .put(
    validateRequest({ params: ParamsWithId, body: Item }),
    await updateItemByIdAsync,
  )
  .delete(validateRequest({ params: ParamsWithId }), await deleteItemByIdAsync);

export { itemsRouter };
