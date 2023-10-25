import express, {
  Express,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import Person from "../models/person";

export interface IPerson {
  id?: string;
  name?: string;
  number?: string | number;
}

dotenv.config();
const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(express.static("dist_frontend"));
/** 3.7: Phonebook backend step7 */
app.use(morgan("tiny"));

const errorHandler: ErrorRequestHandler = (
  e: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(e, typeof next);
  switch (e.name) {
    case "CastError":
      res.status(400).send({ error: "malformatted id" });
      break;
    case "ValidationError":
      res.status(400).send({ Error: e.message });
      break;
  }
};

/** 3.8*: Phonebook backend step8 */
app.use(
  morgan(":method :url :status :response-time ms :res[content-length] :POST")
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
morgan.token("POST", (req: Request, res: Response) => JSON.stringify(req.body));

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
app.get("/api/persons", (req: Request, res: Response, next: NextFunction) => {
  Person.find({})
    .then((persons) => (persons ? res.json(persons) : res.status(404).end()))
    .catch((e: Error) => next(e));
});
/** 3.2: Phonebook backend step2 */
app.get("/info", (req: Request, res: Response) => {
  res.send(`<p>Phonebook har info for 2 people</p> ${new Date()}`);
});
app.get(
  "/api/persons/:id",
  (req: Request, res: Response, next: NextFunction) => {
    Person.findById(req.params.id)
      .then((person) => (person ? res.json(person) : res.status(404).end()))
      .catch((e: Error) => {
        next(e);
      });
  }
);

app.delete(
  "/api/persons/:id",
  (req: Request, res: Response, next: NextFunction) => {
    Person.findByIdAndDelete(req.params.id)
      .then(() => res.status(204).end())
      .catch((e) => next(e));
  }
);

app.put(
  "/api/persons/:id",
  (req: Request, res: Response, next: NextFunction) => {
    req.body
      ? putPerson(req, res, next)
      : res.status(400).json({ error: "Person not found" });
  }
);

const putPerson = (req: Request, res: Response, next: NextFunction) => {
  const person: IPerson = {
    name: req.body.name,
    number: req.body.number,
  };
  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
  })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((e: Error) => next(e))
    .finally(() => {
      console.log(person);
    });
};

/** 3.6: Phonebook backend step6 */
app.post("/api/persons", (req: Request, res: Response, next: NextFunction) => {
  req.body
    ? postPerson(req, res, next)
    : res.status(400).json({ error: "Content missing" });
});

const postPerson = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.name && req.body.number) {
      const person = new Person({
        name: req.body.name,
        number: req.body.number,
      });

      person
        .save()
        .then((savedPerson) => res.json(savedPerson))
        .catch((e: Error) => next(e));
    } else {
      res.status(400).send("Error person else").end();
    }
  } catch (e) {
    res.status(400).send("Could not post person").end();
  }
};
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.use(errorHandler);
