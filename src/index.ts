import { server } from "./api/server.js";
import { envVars as env } from "./utils/parseEnvVars.js";

// Extract the port number from the environmental variable
const PORT = parseInt(env.API_PORT, 10);

// Start the Express server listening on specified port
// Any requests that are sent to the port are picked up by the server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
