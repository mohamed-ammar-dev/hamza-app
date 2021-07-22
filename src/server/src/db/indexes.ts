export class Index {
  constructor(private db) {
    this.create();
  }

  create() {
    this.db.collection("Account").createIndex({ date: -1 });
  }
}
