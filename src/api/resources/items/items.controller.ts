import { NextFunction, Request, Response } from "express";
import { Item, ItemWithId } from "./items.model.js";
import { items as itemsService } from "./items.service.js";

/**
 * @desc   Returns all Items
 * @route  GET /api/v1/items
 * @access Public
 */
export async function getAllItemsAsync(
  req: Request,
  res: Response<ItemWithId[]>,
  next: NextFunction,
) {
  try {
    // Look for items
    const itemsList = await itemsService.getAllItemsAsync();

    if (itemsList && itemsList.length > 0) {
      res.status(200).json(itemsList);
    } else {
      res.status(400);
      throw new Error("Unable to retrieve items");
    }
  } catch (err) {
    // Pass error to next middleware (error handler)
    next(err);
  }
}

/**
 * @desc   Returns an item by its id
 * @route  GET /api/v1/items/:id
 * @access Public
 */
export async function getItemByIdAsync(
  req: Request<{ id: string }>,
  res: Response<ItemWithId>,
  next: NextFunction,
) {
  try {
    // Find the item
    const itemId = req.params.id;
    const item = await itemsService.getItemByIdAsync(itemId);

    // Handle case when item is not found
    if (!item) {
      res.status(400);
      throw new Error(`Item with id ${itemId} not found.`);
    }

    // Send the response
    res.status(200).json(item);
  } catch (err) {
    // Pass error to next middleware (error handler)
    next(err);
  }
}

/**
 * @desc   Adds a new item
 * @route  POST /api/v1/items
 * @access Public
 */
export async function addItemAsync(
  req: Request<{}, {}, Item>,
  res: Response<ItemWithId[]>,
  next: NextFunction,
) {
  try {
    // Extract values from request body
    const { name, quality, value } = req.body;

    // Create the new Item to add to the list
    const newItem: Item = {
      name,
      quality,
      value,
    };

    const updatedItems = await itemsService.addItemAsync(newItem);

    // Send the response
    res.status(201).json(updatedItems);
  } catch (err) {
    // Pass error to next middleware (error handler)
    next(err);
  }
}

/**
 * @desc   Updates item with specified id
 * @route  PUT /api/v1/items/:id
 * @access Public
 */
export async function updateItemByIdAsync(
  req: Request<{ id: string }, {}, Item>,
  res: Response<ItemWithId>,
  next: NextFunction,
) {
  try {
    // Extract the id from the route param
    const itemId = req.params.id;

    // Extract values from request body
    const { name, quality, value } = req.body;

    // Update the item with specific id
    const updatedItem = await itemsService.updateItemByIdAsync(
      itemId,
      name,
      quality,
      value,
    );

    // Send the response
    res.status(200).json(updatedItem);
  } catch (err) {
    // Pass error to next middleware (error handler)
    next(err);
  }
}

/**
 * @desc   Deletes the item with specified id
 * @route  DELETE /api/v1/items/:id
 * @access Public
 */
export async function deleteItemByIdAsync(
  req: Request<{ id: string }>,
  res: Response<ItemWithId>,
  next: NextFunction,
) {
  try {
    // Extract the id from the route param
    const itemId = req.params.id;

    const deletedItem = await itemsService.deleteItemByIdAsync(itemId);

    // Send the response
    res.status(200).json(deletedItem);
  } catch (err) {
    // Pass error to next middleware (error handler)
    next(err);
  }
}
