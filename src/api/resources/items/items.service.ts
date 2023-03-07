import { randomUUID } from "node:crypto";
import { Item, ItemQuality, ItemWithId } from "./items.model.js";

// Define the initial items array
const itemsArr: ItemWithId[] = [
  {
    id: "615a0e18-415c-41ba-9c51-3b403deec651",
    name: "bronze sword",
    quality: "common",
    value: 10,
  },
  {
    id: "bebaf5f9-2cbe-4c84-a472-4bd11dadec79",
    name: "Poseidon's Trident",
    quality: "legendary",
    value: 1000,
  },
  {
    id: "eb425a54-9966-4b70-a64b-8020e3ce5995",
    name: "greater health potion",
    quality: "uncommon",
    value: 100,
  },
];

/**
 * This class mocks the functionality to send CRUD requests to a Database
 * Class will hold an instance of a list (mocks a database table)
 * Class also contains methods for CRUD operations on the list (which would normally be sent to the database)
 */
class Items {
  // Represents simulated DB data
  #items: ItemWithId[];

  constructor(itemsArray: ItemWithId[]) {
    this.#items = itemsArray;
  }

  /**
   * Get all items
   * @returns Promise with items array
   */
  getAllItemsAsync = () => {
    return new Promise<ItemWithId[]>((resolve, reject) => {
      if (this.#items) {
        resolve(this.#items);
      } else {
        reject(new Error("Unable to get retrieve items"));
      }
    });
  };

  /**
   * Return an item with specified id
   * @param id UUID of the requested item
   * @returns item with specified id
   */
  getItemByIdAsync = (id: string) => {
    return new Promise<ItemWithId>((resolve, reject) => {
      const item = this.#items.find(itm => itm.id === id);
      if (item) {
        resolve(item);
      } else {
        reject(new Error(`Unable to retrieve item with id ${id}`));
      }
    });
  };

  /**
   * Add the passed in item to the items array
   * @param item object to add to the items array
   * @returns updated items array
   */
  addItemAsync = (item: Item) => {
    return new Promise<ItemWithId[]>(resolve => {
      const uuid = randomUUID();
      const newItem: ItemWithId = {
        id: uuid,
        ...item,
      };
      this.#items.push(newItem);
      resolve(this.#items);
    });
  };

  /**
   * Update the name or value of an item
   * @param id UUID of the specified item to update
   * @param name optional: new item name
   * @param value optional: new item value
   * @returns updated item
   */
  updateItemByIdAsync = (
    id: string,
    name?: string,
    quality?: ItemQuality,
    value?: number,
  ) => {
    return new Promise<ItemWithId>((resolve, reject) => {
      const itemToUpdateIdx = this.#items.findIndex(item => item.id === id);

      if (itemToUpdateIdx !== -1) {
        if (name) {
          this.#items[itemToUpdateIdx]!.name = name;
        }

        if (quality) {
          this.#items[itemToUpdateIdx]!.quality = quality;
        }

        if (value) {
          this.#items[itemToUpdateIdx]!.value = value;
        }

        resolve(this.#items[itemToUpdateIdx]!);
      } else {
        reject(new Error(`Error updating item with id ${id}`));
      }
    });
  };

  /**
   * Remove an item of specified id
   * @param id UUID of item to remove
   * @returns removed item
   */
  deleteItemByIdAsync = (id: string) => {
    return new Promise<ItemWithId>((resolve, reject) => {
      const itemToRemove = this.#items.find(item => item.id === id);

      if (itemToRemove) {
        const filtered = this.#items.filter(item => item.id !== id);
        this.#items = [...filtered];
        resolve(itemToRemove);
      } else {
        reject(new Error(`Unable to find item with id ${id}`));
      }
    });
  };
}

// Instantiate the Items class
export const items = new Items(itemsArr);
