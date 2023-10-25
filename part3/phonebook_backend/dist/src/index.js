"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const person_1 = __importDefault(require("../models/person"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static("dist_frontend"));
/** 3.7: Phonebook backend step7 */
app.use((0, morgan_1.default)("tiny"));
const errorHandler = (e, req, res, next) => {
    console.log(e, typeof next);
    switch (e.name) {
        case "CastError":
            res.status(400).send({ error: "malformatted id" });
            break;
        case "ValidationError":
            res.status(400).json({ Error: e.message });
            break;
    }
};
/** 3.8*: Phonebook backend step8 */
app.use((0, morgan_1.default)(":method :url :status :response-time ms :res[content-length] :POST"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
morgan_1.default.token("POST", (req, res) => JSON.stringify(req.body));
/** Root of the application */
app.get("/", (req, res) => {
    res.send(`<h1>Persons API server</h1> 
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
    </table>`);
});
/** 3.1: Phonebook backend step1 */
app.get("/api/persons", (req, res, next) => {
    person_1.default.find({})
        .then((persons) => (persons ? res.json(persons) : res.status(404).end()))
        .catch((e) => next(e));
});
/** 3.2: Phonebook backend step2 */
app.get("/info", (req, res) => {
    res.send(`<p>Phonebook har info for 2 people</p> ${new Date()}`);
});
app.get("/api/persons/:id", (req, res, next) => {
    person_1.default.findById(req.params.id)
        .then((person) => (person ? res.json(person) : res.status(404).end()))
        .catch((e) => {
        next(e);
    });
});
app.delete("/api/persons/:id", (req, res, next) => {
    person_1.default.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).end())
        .catch((e) => next(e));
});
app.put("/api/persons/:id", (req, res, next) => {
    req.body
        ? putPerson(req, res, next)
        : res.status(400).json({ error: "Person not found" });
});
const putPerson = (req, res, next) => {
    const person = {
        name: req.body.name,
        number: req.body.number,
    };
    person_1.default.findByIdAndUpdate(req.params.id, person, {
        new: true,
        runValidators: true,
    })
        .then((updatedPerson) => res.json(updatedPerson))
        .catch((e) => next(e))
        .finally(() => {
        console.log(person);
    });
};
/** 3.6: Phonebook backend step6 */
app.post("/api/persons", (req, res, next) => {
    req.body
        ? postPerson(req, res, next)
        : res.status(400).json({ error: "Content missing" });
});
const postPerson = (req, res, next) => {
    try {
        if (req.body.name && req.body.number) {
            const person = new person_1.default({
                name: req.body.name,
                number: req.body.number,
            });
            person
                .save()
                .then((savedPerson) => res.json(savedPerson))
                .catch((e) => next(e));
        }
        else {
            res
                .status(400)
                .send("Could not add person due to missing fields or content")
                .end();
        }
    }
    catch (e) {
        res.status(400).send("Could not post person").end();
    }
};
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
app.use(errorHandler);
//# sourceMappingURL=index.js.map