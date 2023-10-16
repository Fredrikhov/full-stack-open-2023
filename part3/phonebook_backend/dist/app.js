"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
[];
let people = [
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
    }
    else {
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
app.post("/api/persons", (req, res) => {
    const body = req.body;
    !body ? res.json(body) : res.status(400).json({ error: "content missing" });
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map