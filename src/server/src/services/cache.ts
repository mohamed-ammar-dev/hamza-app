import { redis } from "../db/redis";
import { promisify } from "util";

redis.hget = promisify(redis.hget);

export function saveAuthToken(user, token) {
  redis.hset(user._id, token, JSON.stringify(user), "EX", 86400000 * 2);
}

export function saveResetPasswordToken(user_id, token) {
  redis.hset(user_id, "token", token, "EX", 60 * 60 * 1000);
}

export async function getUserByToken(user_id, token) {
  return await redis.hget(user_id, token);
}

export async function getResetPasswordToken(user_id) {
  return await redis.hget(user_id, "token");
}

export async function clearToken(user_id, token) {
  redis.hdel(user_id, token);
}

export async function clearAllTokens(user_id) {
  redis.del(user_id);
}
