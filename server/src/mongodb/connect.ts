import { MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config";

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING || "", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database: any;

function connectToServer() {
  try {
    database = client.db("habit-tracker");

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
}

function getDb() {
  if (!database) {
    throw new Error("❌ Database is not connected");
  }

  return database;
}

export { connectToServer, getDb };
