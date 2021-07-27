import { db } from "../db/mongodb";
import { MODEL } from "../interfaces/Interfaces";

export const User = db.collection(MODEL.USER);
