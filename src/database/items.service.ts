/**
 * This module mocks a Database and the logic needed to perform CRUD operations on it
 * It will be used by items.controller
 *
 * The "Items" class contains an instance of an Items Array which typically would be provided by a database
 * The class also contains methods to perform CRUD operations on the Items Array
 */

interface IItem {
  id: string;
  name: string;
  qty: number;
}

const itemsArr: IItem[] = [
  { id: "615a0e18-415c-41ba-9c51-3b403deec651", name: "sword", qty: 1 },
  { id: "bebaf5f9-2cbe-4c84-a472-4bd11dadec79", name: "bread", qty: 2 },
  { id: "eb425a54-9966-4b70-a64b-8020e3ce5995", name: "potion", qty: 3 },
];

class Items {
  // Simulated
  #items: IItem[];

  constructor(itemsArray: IItem[]) {
    this.#items = itemsArray;
  }

  getItems = () => {
    return this.#items;
  };

  getItemById = (id: string) => {
    return this.#items.find(item => item.id === id);
  };

  addItem = (item: IItem) => {
    this.#items.push(item);
    return this.#items;
  };

  updateItemById = (id: string, name: string, qty: number) => {
    const updatedItems = this.#items.map(item =>
      item.id === id ? { id, name, qty } : item,
    );

    this.#items = [...updatedItems];
  };

  deleteItemById = (id: string) => {
    const filtered = this.#items.filter(item => item.id !== id);
    this.#items = [...filtered];
  };
}

// Instantiate the Items class
const items = new Items(itemsArr);

export { items, IItem };
