import config from "../utils/config";
import { set, model, connect, Schema } from "mongoose";

interface Iblog {
  title: string;
  author: string;
  url: string;
  likes: number;
}
if (config.MONGO_URL) {
  connect(config.MONGO_URL)
    .then((res) => console.log(`Sucessfully connected ${res}`))
    .catch((e) =>
      console.log(`Error while connecting to mongoDB ${e.message}`)
    );
} else {
  console.log(`Issues while connecting to mongoDB`);
}
set("strictQuery", false);
const blogSchema = new Schema<Iblog>({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

export default model<Iblog>("blog", blogSchema);
