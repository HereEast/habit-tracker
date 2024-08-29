import dotenv from "dotenv";

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === "development";

export const HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
export const PORT = process.env.PORT ? Number(process.env.PORT) : 5050;

export const SERVER = {
  HOSTNAME,
  PORT,
};
