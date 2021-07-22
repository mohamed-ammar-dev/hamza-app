import { MongoClient } from "mongodb";
import { Index } from "./indexes";

class MongoDB {
  private client;

  constructor() {
    this.uncaughtException();
    this.connect();
  }

  get db() {
    return this.client.db("hamza-app");
  }

  async connect() {
    this.client = new MongoClient(process.env.MONGODB_URL as string);
    await this.client.connect();
    new Index(this.db);
    console.log("MongoDB connected...");
  }

  private uncaughtException() {
    process.on("uncaughtException", (err) => {
      console.log(err);
      console.log(`UNCAUGHT REJECTION! Shutting down...`);
      process.exit(1); // 0 success, 1 failure
    });
  }
}

const mongodb = new MongoDB();

export const db = mongodb.db;
