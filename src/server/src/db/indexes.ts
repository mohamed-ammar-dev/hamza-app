import { MODEL } from "../interfaces/Interfaces";

export class Index {
  constructor(private db) {
    this.create();
  }

  async create() {
    this.db.collection(MODEL.USER).createIndex({ email: -1 });
    this.db.collection(MODEL.ACCOUNT).createIndex({ date: -1 });
    this.db.collection(MODEL.PRODUCT).createIndex({ isDownloaded: 1 });
    this.db.collection(MODEL.PRODUCT).createIndex({ date: -1 });
  }
}
