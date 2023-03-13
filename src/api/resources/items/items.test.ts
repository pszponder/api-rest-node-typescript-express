import request from "supertest";
import { describe, expect, expectTypeOf, it } from "vitest";
import { server as expressServer } from "../../server.js";
import { ItemWithId } from "./items.model.js";
import { items, itemsArr } from "./items.service.js";

// Define the rootEndpoint used by the items route
const rootEndpoint = "/api/v1/items";

describe("GET /api/v1/items", () => {
  it("responds with an array of all items", async () => {
    // ARRANGE - Define testing environments & Values

    // ACT - Run the code that is being tested
    const response = await request(expressServer)
      .get(rootEndpoint)
      .set("Accept", "application/json");

    // ASSERT - Evaluate result and compare to expected value
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("length"); // Returned item from boy is an array of items
    expect(response.body.length).toBe(3); // Service providing data contains 3 items at the start
    expectTypeOf(response.body[0]).toEqualTypeOf<ItemWithId>; // Check the type of one of the items in the array of items returned
  });
});

describe("GET /api/v1/items/:id", () => {
  it("responds with an item of specified id", async () => {
    // ARRANGE - Define testing environments & Values
    const itemId = "bebaf5f9-2cbe-4c84-a472-4bd11dadec79";
    const endpoint = `${rootEndpoint}/${itemId}`;
    const foundItem = itemsArr.find(itm => itm.id === itemId);

    // ACT - Run the code that is being tested
    const response = await request(expressServer)
      .get(endpoint)
      .set("Accept", "application/json");

    // ASSERT - Evaluate result and compare to expected value
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expectTypeOf(response.body).toEqualTypeOf<ItemWithId>; // Check the type of one of the items in the array of items returned
    expect(response.body.name).toBe(foundItem?.name);
    expect(response.body.quality).toBe(foundItem?.quality);
    expect(response.body.value).toBe(foundItem?.value);
  });
});

describe("POST /api/v1/items", () => {
  it("responds with an updated list of items", async () => {
    // ARRANGE - Define testing environments & Values
    const newItem = {
      name: "Cool Sword",
      quality: "uncommon",
      value: 150,
    };

    // ACT - Run the code that is being tested

    // Make a GET request to get the current list of items
    const responseGet = await request(expressServer)
      .get(rootEndpoint)
      .set("Accept", "application/json");

    // Make POST request to test the endpoint
    const responsePost = await request(expressServer)
      .post(rootEndpoint)
      .set("Accept", "application/json")
      .send(newItem);

    // ASSERT - Evaluate result and compare to expected value
    expect(responsePost.headers["content-type"]).toMatch(/json/);
    expect(responsePost.status).toEqual(201);
    expectTypeOf(responsePost.body).toEqualTypeOf<ItemWithId[]>; // Check the type of one of the items in the array of items returned
    expect(responsePost.body.length).toBe(responseGet.body.length + 1);
  });
});

describe("PUT /api/v1/items/:id", () => {
  it("responds with an updated item based on passed-in object + item Id", async () => {
    // ARRANGE - Define testing environments & Values
    const itemId = "bebaf5f9-2cbe-4c84-a472-4bd11dadec79";
    const updatedItem = {
      name: "Poseidon's Spear",
      quality: "common",
      value: 100000,
    };
    const endpoint = `${rootEndpoint}/${itemId}`;

    // ACT - Run the code that is being tested
    const response = await request(expressServer)
      .put(endpoint)
      .set("Accept", "application/json")
      .send(updatedItem);

    // ASSERT - Evaluate result and compare to expected value
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expectTypeOf(response.body).toEqualTypeOf<ItemWithId>; // Check the type of one of the items in the array of items returned
    expect(response.body.name).toBe(updatedItem.name);
    expect(response.body.quality).toBe(updatedItem.quality);
    expect(response.body.value).toBe(updatedItem.value);
  });
});

describe("DELETE /api/v1/items/:id", () => {
  it("responds with deleted item", async () => {
    // ARRANGE - Define testing environments & Values
    const itemId = "bebaf5f9-2cbe-4c84-a472-4bd11dadec79";
    const endpoint = `${rootEndpoint}/${itemId}`;

    // ACT - Run the code that is being tested

    // Make a GET request to get the current list of items (before item deleted)
    const responseGetAllBefore = await request(expressServer)
      .get(rootEndpoint)
      .set("Accept", "application/json");

    // Make a GET request to get the item to be deleted
    const responseGetById = await request(expressServer)
      .get(endpoint)
      .set("Accept", "application/json");

    // Make DELETE request to test the endpoint
    const responseDelete = await request(expressServer)
      .delete(endpoint)
      .set("Accept", "application/json");

    // Make a GET request to get the current list of items (after item deleted)
    const responseGetAllAfter = await request(expressServer)
      .get(rootEndpoint)
      .set("Accept", "application/json");

    // ASSERT - Evaluate result and compare to expected value
    expect(responseDelete.headers["content-type"]).toMatch(/json/);
    expect(responseDelete.status).toEqual(200);
    expectTypeOf(responseDelete.body).toEqualTypeOf<ItemWithId>; // Check type of returned item
    expect(responseGetAllAfter.body.length).toBe(
      responseGetAllBefore.body.length - 1,
    );
    expect(responseDelete.body.name).toBe(responseGetById.body.name);
    expect(responseDelete.body.quality).toBe(responseGetById.body.quality);
    expect(responseDelete.body.value).toBe(responseGetById.body.value);
  });
});
