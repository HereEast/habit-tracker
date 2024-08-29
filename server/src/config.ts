import dotenv from "dotenv";

dotenv.config();

export const CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING || "";

export const DEVELOPMENT = process.env.NODE_ENV === "development";

const HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const PORT = process.env.PORT ? Number(process.env.PORT) : 5050;

export const SERVER = {
  HOSTNAME,
  PORT,
};
