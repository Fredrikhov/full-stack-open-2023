import express from "express";

const app = express();
app.use(express.json());
const port = 3000;

interface IPeople {
  id: number;
  name: string;
  number: string;
}
[];
let people: IPeople[] = [
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
// Get all people
app.get("/api/persons", (req, res) => {
  res.json(people);
});
// Get person
app.get("/api/persons/:id", (req, res) => {
  const personId = Number(req.params.id);
  const person = people.find((person) => person.id === personId);
  if (person) {
    res.json(person);
  } else {
    res.status(400).end();
  }
});
// Delete person by id
app.delete("/api/persons/:id", (req, res) => {
  const personId = Number(req.params.id);
  people = people.filter((person) => person.id !== personId);
  res.status(204).end();
});

app.get("/info", (req, res) => {
  res.timestamp = new Date(8.64e15).toString();
  res.peopleLength = people.length;
  res.send(`<p>Phonebook has info for ${res.peopleLength} people</p> <br/>
  <p>${res.timestamp}</p>
  `);
});

// Post a new person
app.post("/api/persons", (req, res) => 
  
  req.body ? res.json(req.body) : res.status(400).json({ error: "content missing" });
);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
