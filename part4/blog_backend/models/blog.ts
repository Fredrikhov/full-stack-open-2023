import { set, connect, model, Schema, Document } from "mongoose";
import config from "../utils/config";

export interface Iblog {
  id?: string;
  title: string;
  author?: string;
  url: string;
  likes: number;
  v?: number;
  blogs: number;
}
if (config.MONGO_URL) {
  connect(config.MONGO_URL)
    .then((res) => console.log(`Sucessfully connected ${res}`))
    .catch((e: Error) =>
      console.log(`Error while connecting to mongoDB ${e.message}`)
    );
} else {
  console.log(`Issues while connecting to mongoDB`);
}

set("strictQuery", false);
const blogSchema = new Schema<Iblog>({
  id: { type: String, required: false },
  title: { type: String, required: true },
  author: { type: String },
  url: { type: String, required: true },
  likes: { type: Number },
});

blogSchema.set("toJSON", {
  transform: (
    document: Document,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    returnedObject: Record<"_id" | "id" | "name" | "number" | "__v", any>
  ) => {
    // do not return ._id object - cast to a string value
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<Iblog>("blog", blogSchema);
