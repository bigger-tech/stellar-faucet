import dotenv from "dotenv";

dotenv.config();

export const { ISSUER_SECRET_KEY, DISTRIBUTOR_SECRET_KEY, SERVER_URL, PORT } =
  process.env;
