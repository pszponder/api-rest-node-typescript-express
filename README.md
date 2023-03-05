# ExpressJS REST API

## Technology Used

- TypeScript
- ExpressJS
- Zod

## Project Setup

## Project Structure & Overview

## Scripts:

Use the following command to run the scripts:
`pnpm <script-name>`

- `clean`: Deletes the `dist` directory and all of its contents
- `build`: `Rebuilds` the `build` directory and its contents
- `build-prod`: Same as `build` but output code is minified and bundled, also build d.ts type files
- `start`: Builds the project and runs transpiled code from the `dist` directory
- `watch`: Transpiles code and executes it in watch mode. Any changes to code will cause code to re-transpile and re-run.
- `test`: Runs all `...spec.ts` and `...test.ts` files using `Vitest`
- `test-related`: Pass in space-separated file paths to files in the `src` directory you wish to run tests for
- `test-watch`: Runs `Vitest` in "watch" mode (changes to test files cause `Vitest` to rerun them)
- `check-format`: Check for format errors in TS files in `src` directory
- `check-lint`: Check for linting errors in TS files in `src` directory
- `check-types`: Check for type errors in TS files in `src` directory
- `check-all`: Check all TS files in `src` directory for errors (formatting, linting, or type errors)
- `fix-format`: Fix all formatting errors in TS files in `src` directory
- `fix-lint`: Fix all linting errors in TS files in `src` director
- `fix-all`: Fix all formatting and linting errors & rebuild the project
- `scratch`: Runs the transpiles and `scratch.ts` file located in the `src/_scratch` directory

## References:

- [Traversy Media - MERN Tutorial](https://github.com/bradtraversy/mern-tutorial)
- [Coding Garden - Build a CRUD API w/ TypeScript, Express, MongoDB, Zod and Jest](https://youtu.be/vDLE8hqzA8I)
- [Coding Garden - Express API Starter w/ TypeScript](https://github.com/CodingGarden/intro-to-typescript/tree/examples/examples/express-api)
- [TomDoesTech - Build a REST API with Node.js, Express, TypeScript, MongoDB & Zod](https://youtu.be/BWUi6BS9T5Y)
- [TomDoesTech - REST-API-Tutorial-Updated](https://github.com/TomDoesTech/REST-API-Tutorial-Updated)
- [Tomasz Tarnowski - How to Build REST APIs LIKE A PRO in 2023 (With Tests)](https://youtu.be/Ky-5AVA5o4s)
- [Tomasz Tarnowski - ts-serverless-openapi-template](https://github.com/ttarnowski/ts-serverless-openapi-template)
- [Twilio - Add Cors Support Express TypeScript API](https://www.twilio.com/blog/add-cors-support-express-typescript-api)
- [Node / TypeScript Template](https://github.com/pszponder/template_node-ts)
