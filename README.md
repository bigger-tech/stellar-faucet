# Stellar Faucet

A custom faucet server for the Stellar network, allowing users to fund their accounts with a custom asset.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Getting Started

This project provides a simple faucet server for the Stellar network, allowing users to fund their accounts with a custom asset. The server uses the Stellar SDK to interact with the network and perform transactions.

## Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)
- Stellar SDK (version 13.1.0 or higher)
- A Stellar account with a secret key (for the issuer and distributor)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bigger-tech/stellar-faucet.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the required environment variables (see **.env.dist** file for references).

## Usage

1. Start the server:
   ```bash
   npm start
   ```
2. Open a web browser and navigate to [http://localhost:3000](http://localhost:3000).
3. Use the `/friendbot` endpoint to fund an account with the custom asset (see API Endpoints below).

## API Endpoints

- `/:` Welcome page with instructions
- `/friendbot`: Fund an account with the custom asset (requires address query parameter)

## Environment Variables

The following environment variables are required:

- `ISSUER_SECRET_KEY`: The secret key of the issuer account
- `DISTRIBUTOR_SECRET_KEY`: The secret key of the distributor account
- `SERVER_URL`: The URL of the Stellar horizon server (e.g. `https://horizon-testnet.stellar.org`)
- `PORT`: The port number to listen on (default: 3000)

Create a `.env` file with the following format:

```
ISSUER_SECRET_KEY=your-issuer-secret-key
DISTRIBUTOR_SECRET_KEY=your-distributor-secret-key
SERVER_URL=https://horizon-testnet.stellar.org
PORT=3000
```

## Licence

This project is licensed under the ISC License.
