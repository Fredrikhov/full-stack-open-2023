import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

interface IPersons {
  id: number;
  name: string;
  number: string;
}
[];

dotenv.config();
const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
/** 3.7: Phonebook backend step7 */
app.use(morgan("tiny"));

/** 3.8*: Phonebook backend step8 */
app.use(
  morgan(":method :url :status :response-time ms :res[content-length] :POST")
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
morgan.token("POST", (req: Request, res: Response) => JSON.stringify(req.body));

let persons: IPersons[] = [
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
  res.send(
    `<h1>Persons API server</h1> 
    <p>Get information about persons via a RESTful API</p>
    <table>
      <tbody>
        <tr>
          <th>Endpoint</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>/api/persons</td>
          <td>All persons</td>
        </tr>
        <tr>
        <td>/api/persons/{id}</td>
        <td>Get person by id</td>
      </tr>
      </tbody>
    </table>`
  );
});
/** 3.1: Phonebook backend step1 */
app.get("/api/persons", (req: Request, res: Response) => {
  try {
    return res.json(persons);
  } catch (e) {
    res.send("error").status(404).end();
  }
});
/** 3.2: Phonebook backend step2 */
app.get("/info", (req: Request, res: Response) => {
  res.send(`<p>Phonebook har info for 2 people</p> ${new Date()}`);
});
/** 3.3: Phonebook backend step3 */
app.get("/api/persons/:id", (req: Request, res: Response) => {
  const personId = persons.find(
    (person) => person.id === Number(req.params.id)
  );
  if (personId) {
    res.send(personId);
  } else {
    res.status(404);
    res.send("Person does not exsist").end();
  }
});
/** 3.4: Phonebook backend step4 */
app.delete("/api/persons/:id", (req: Request, res: Response) => {
  persons = persons.filter((person) => person.id !== Number(req.params.id));
  if (persons) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});
/** 3.6: Phonebook backend step6 */
app.post("/api/persons", (req: Request, res: Response) => {
  req.body
    ? postPerson(req, res)
    : res.status(400).json({ error: "Content missing" });
});
const postPerson = (req: Request, res: Response) => {
  try {
    if (
      req.body.name &&
      req.body.number &&
      !persons.some((person) => person.name === req.body.name)
    ) {
      const person: IPersons = {
        id: Math.floor(Math.random() * 1000),
        name: req.body.name,
        number: req.body.number,
      };
      persons = [...persons, person];
      res.json(`Person ${person.name} added`);
    } else {
      res
        .status(400)
        .send(
          "Could not add person due to missing fields, content or already added"
        )
        .end();
    }
  } catch (e) {
    res.status(400).send("Could not post person").end();
  }
};
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
