import { set, Document, Schema, model, connect } from "mongoose";
import dotenv from "dotenv";
import { IPerson } from "../src";

dotenv.config();
set("strictQuery", false);
connect(process.env.DBLINK)
  .then((res) => console.log(`Sucessfully connected ${res}`))
  .catch((e) => console.log(`Error while connecting to mongoDB ${e.message}`));

const customPhoneValidation = (v) => {
  return /\d{3}-\d{8}/.test(v);
};
/** Create a schema */
const personSchema = new Schema<IPerson>({
  id: { type: String, required: false },
  name: { type: String, required: true, minlength: 3 },
  number: {
    type: String || Number,
    required: true,
    minlength: 8,
    validate: [
      {
        validator: customPhoneValidation,
        message: "Not a valid phone number",
      },
    ],
  },
});
personSchema.set("toJSON", {
  transform: (
    document: Document,
    returnedObject: Record<"_id" | "id" | "name" | "number" | "__v", string>
  ) => {
    // do not return ._id object - cast to a string value
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<IPerson>("Person", personSchema);
