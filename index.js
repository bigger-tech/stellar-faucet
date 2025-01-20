import express from "express";
import { PORT } from "./src/config/environment.js";

import { fundAccount } from "./src/services/friendbotService.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome into our custom faucet server!");
});

app.post("/friendbot", async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(400).send("Address is required");
  }

  await fundAccount(address);

  return res.status(200).send("Account funded");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port: ${PORT}!`);
});
