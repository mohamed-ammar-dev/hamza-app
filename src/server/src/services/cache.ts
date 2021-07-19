import { createClient } from "redis";
import { Query, Aggregate } from "mongoose";
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

const execQ = Query.prototype.exec;
const execA = Aggregate.prototype.exec;

Query.prototype.cache = cache;
Aggregate.prototype.cache = cache;

Query.prototype.exec = execQuery;
Aggregate.prototype.exec = execAggregate;

async function execQuery(this: any) {
  if (!this.useCache) return execQ.apply(this);

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  const cacheValue = await client.get(key);

  if (cacheValue) {
    const doc = JSON.parse(cacheValue);

    console.log("running from cache");

    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }
  const result = await execQ.apply(this);

  client.set(key, JSON.stringify(result));
  console.log("running from DB");

  return result;
}

async function execAggregate(this: any) {
  if (!this.useCache) return execA.apply(this);

  const key = JSON.stringify({
    query: this.pipeline(),
  });

  const cacheValue = await client.get(key);

  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    console.log("running from cache");

    return new this.model(doc);
  }
  const result = await execA.apply(this);

  client.set(key, JSON.stringify(result));

  console.log("running from DB");

  return result;
}

function cache(this: any) {
  this.useCache = true;
  return this;
}

export const cleanCache = () => client.flushall();
