import { createClient } from "redis";
import { promisify } from "util";

class Redis {
  connect() {
    const client = createClient({
      host: process.env.REDIS_URL,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
    });
    client.flushall();
    console.log("Redis connected...");
    return client;
  }
}

const redis = new Redis();
const client = redis.connect();

client.get = promisify(client.get);

export async function cache(queryObj, query, collectionName) {
  const key = JSON.stringify(
    Object.assign({}, query, {
      collection: collectionName,
    })
  );

  const cacheValue = await client.get(key);

  if (cacheValue) {
    const doc = JSON.parse(cacheValue);

    console.log("running from cache");

    return doc;
  }

  const result = await queryObj;

  client.set(key, JSON.stringify(result));
  console.log("running from DB");

  return result;
}

export const cleanCache = () => client.flushall();
