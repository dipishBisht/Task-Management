import { config } from "dotenv";

config();

// # All .env variables

export const { PORT, MONGO_URL_LOCAL, JWT_SECRET } = process.env;
