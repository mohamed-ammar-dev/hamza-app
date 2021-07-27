import { createClient } from "redis";

class Redis {
  connect() {
    const client = createClient({
      host: process.env.REDIS_URL,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
    });
    // client.flushall();
    console.log("Redis connected...");
    return client;
  }
}

export const redis = new Redis().connect();
