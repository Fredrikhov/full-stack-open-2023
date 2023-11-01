import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;
const MONGO_URL =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB
    : process.env.PROD_MONGODB;

export default { PORT, MONGO_URL };
