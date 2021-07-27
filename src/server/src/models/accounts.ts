import { db } from "../db/mongodb";
import { MODEL } from "../interfaces/Interfaces";

export const Account = db.collection(MODEL.ACCOUNT);
