import request from "supertest";
import { describe, expect, it } from "vitest";

// Import the express application / server
import { server as expressServer } from "./server.js";

// Test the express server
describe("express server", () => {
  // Check that server responds with 404 for non-valid request
  it("responds with a not found message for unknown route", async () => {
    // ARRANGE - Define testing environments & Values

    // ACT - Run the code that is being tested
    const response = await request(expressServer)
      .get("/unknown-endpoint")
      .set("Accept", "application/json");

    // ASSERT - Evaluate result and compare to expected value
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(404);
  });
});
