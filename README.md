# ExpressJS REST API

## Technology Used

- TypeScript
- ExpressJS
- Zod

## Project Setup

### Create Self-signed Certificates for https communication

An SSL certificate encrypts communication between your sever and clients.

A self-signed certificates cannot be used by a user to validate the identify of your server automatically. To do this, you have to use a CA-signed certificate (ex. by using Let's Encrypt)

To create a self-signed certificate, follow the steps below (taken from [How to Create an HTTPS NodeJS Web Service with Express](https://adamtheautomator.com/https-nodejs/#Creating_an_SSL_Certificate)):

1. Create a "certs" directory in the project root path and cd into it
2. Generate a key file used for self-signed certificate generation

```bash
# Generates a private key as a file called key.pem
openssl genrsa -out key.pem
```

3. Generate a certificate service request (CSR). The CSR is required to provide all of input necessary to create the actual certificate

```bash
# Passing this command will prompt you to answer some questions
openssl req -new -key key.pem -out csr.pem
```

4. Generate certificate by providing private key (`key.pem`) and CSR (`csr.pem`).

```bash
# Create a certificate called cert.pem with validity of 9999 days
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
```

5. At the end of these steps, you should have 3 files in the `certs` directory

- `key.pem` => private key
- `cert.pem` => public key / certificate
- `csr.pem` => self-signed ssl certificate

Summary of Commands to setup the certs

```bash
# Create a new certs directory in the project's root directory
mkdir certs && cd certs

# Generates a private key as a file called key.pem
openssl genrsa -out key.pem

# Passing this command will prompt you to answer some questions
openssl req -new -key key.pem -out csr.pem

# Create a certificate called cert.pem with validity of 9999 days
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
```

## Project Structure & Overview

# Notes

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
- [Tim Kamanin - Running ExpressJS Server over HTTPS](https://timonweb.com/javascript/running-expressjs-server-over-https/)
- [How to Create an HTTPS NodeJS Web Service with Express](https://adamtheautomator.com/https-nodejs/)
- [Self Signed Certificates](https://www.youtube.com/watch?v=Qg5ghpiEHm0)
- [How to Create a Self-Signed SSL Certificate for Nginx in Ubuntu 22.04](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-22-04)
- [Hussein Nasser - What are SSL/TLS Certificates? Why do we need them? How do they work?](https://www.youtube.com/watch?v=r1nJT63BFQ0)
