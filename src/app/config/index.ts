import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  mongodb_url: process.env.MONGODB_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  port: process.env.PORT,
};
