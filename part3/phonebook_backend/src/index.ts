import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
/** Root of the application */
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
/** Get JSON of all persons in arr */
app.get("/api/persons", (req: Request, res: Response) => {
  try {
    return res.json(persons);
  } catch (e) {
    res.send("error").status(404).end();
  }
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
