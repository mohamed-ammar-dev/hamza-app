export class Index {
  constructor(private db) {
    this.create();
  }

  async create() {
    this.db.collection("accounts").createIndex({ date: -1 });
    this.db.collection("products").createIndex({ isDownloaded: 1 });
    this.db.collection("products").createIndex({ date: -1 });
  }
}
