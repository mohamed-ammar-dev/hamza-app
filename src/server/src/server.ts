import { app } from "./app";

class Express {
  private server;

  constructor() {
    this.unhandledRejection();
    this.connect();
  }

  connect() {
    this.server = app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}...`)
    );
  }

  private unhandledRejection() {
    process.on("unhandledRejection", (err) => {
      console.log(err);
      console.log(`UNHANDLED REJECTION! Shutting down...`);
      this.server.close(() => {
        process.exit(1); // 0 success, 1 failure
      });
    });
  }
}

new Express();
