import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.DBLINK;

export default { PORT, MONGO_URL };
