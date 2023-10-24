import mongoose, { Schema, model, connect } from "mongoose";
import dotenv from "dotenv";

interface IPerson {
  name: string;
  number: string | number;
}

dotenv.config();
const url = process.env.DBLINK;
connect(url);

/** Create a schema */
const personSchema = new Schema<IPerson>({
  name: { type: String, required: true },
  number: { type: String || Number, required: true },
});

/** Create model */
const Person = model<IPerson>("Person", personSchema);
/** Make p */
const newPerson = new Person({
  name: process.argv[2],
  number: process.argv[3],
});

newPerson.save().then((person) => {
  console.log(`Added ${person.name} ${person.number}`);
  mongoose.connection.close();
});
/** See all enteries in DB */
Person.find({}).then((persons) => {
  console.log("phonebook:");
  persons.map((person) => {
    console.log(`${person.name} ${person.number}`);
    mongoose.connection.close();
  });
});
