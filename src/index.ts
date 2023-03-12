import { readFile } from "node:fs/promises";
import https from "node:https";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { server as expressApp } from "./api/server.js";
import { envVars as env } from "./utils/parseEnvVars.js";

// Get the directory path of this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Extract the port number from the environmental variable
const PORT = parseInt(env.API_PORT, 10);

// Read in Private and Public keys to pass into the https server
//  These will be used by the HTTPS Server to encrypt incoming requests and outgoing responses
const key = await readFile(`${__dirname}/../certs/key.pem`);
const cert = await readFile(`${__dirname}/../certs/cert.pem`);

// Create an HTTPS server and pass in the express application and start listening on specified port
// All requests / responses sent to HTTPS server on specified port
//  are passed into the Express Application / Server for processing
https.createServer({ key, cert }, expressApp).listen(PORT, () => {
  console.log(`HTTPS server listening on port ${PORT}`);
});
