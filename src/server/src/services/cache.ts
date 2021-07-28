import { redis } from "../db/redis";
import { promisify } from "util";

redis.hget = promisify(redis.hget);

export function saveToken(user, token) {
  redis.hset(user._id, token, JSON.stringify(user), "EX", 86400000 * 2);
}

export async function getUserByToken(user_id, token) {
  return await redis.hget(user_id, token);
}
