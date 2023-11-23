import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

async function main() {
  try {
    await mongoose.connect(config.mongodb_url as string);

    app.listen(config.port, () => {
      console.log(`http://localhost:${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
