import axios from "axios";
const baseUrl = "/api/persons";
import { Person } from "../App.tsx";

// only return reponse.data property
const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = (personObj: Person) =>
  axios.post(baseUrl, personObj).then((response) => response.data);

const remove = (id: string) => axios.delete(`${baseUrl}/${id}`);

const update = (id: string, newPerson: Person) =>
  axios.put(`${baseUrl}/${id}`, newPerson).then((response) => response.data);

export default { getAll, create, remove, update };

/*2.12: The Phonebook step7
Let's return to our phonebook application.*/

/*Currently, the numbers that are added to the phonebook are not saved 
to a backend server. Fix this situation.*/
