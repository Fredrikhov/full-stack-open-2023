"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(0, mongoose_1.set)("strictQuery", false);
(0, mongoose_1.connect)(process.env.DBLINK)
    .then((res) => console.log(`Sucessfully connected ${res}`))
    .catch((e) => console.log(`Error while connecting to mongoDB ${e.message}`));
const customPhoneValidation = (v) => {
    return /\d{3}-\d{8}/.test(v);
};
/** Create a schema */
const personSchema = new mongoose_1.Schema({
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
}, {
    versionKey: false,
});
personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        // do not return ._id object - cast to a string value
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
exports.default = (0, mongoose_1.model)("Person", personSchema);
//# sourceMappingURL=person.js.map