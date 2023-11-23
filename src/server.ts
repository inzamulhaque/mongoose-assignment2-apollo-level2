import app from './app';
import mongoose from 'mongoose';
import config from './app/config';
const port = process.env.PORT || 7000;

async function main() {
  try {
    await mongoose.connect(config.mongodb_url as string);

    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
