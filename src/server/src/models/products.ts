import { db } from "../db/mongodb";
import { MODEL } from "../interfaces/Interfaces";

export const Product = db.collection(MODEL.PRODUCT);
