/* eslint-disable react-hooks/exhaustive-deps */
import React, { MouseEvent, useEffect, useState } from "react";
import "./App.css";
import { SearchFilter } from "./components/SearchFilter";
import { AddNewPerson } from "./components/AddNewPerson";
import { ShowAllPeople } from "./components/ShowAllPeople";
import { ShowFilteredPerson } from "./components/ShowFilteredPerson";
import personService from "./services/persons";
import { Notification } from "./components/Notification";

export interface Person {
  id?: string;
  name: string;
  number: string | number;
}

interface Status {
  type: boolean;
  message: string;
}

export const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [status, setStatus] = useState<Status>();

  useEffect(() => {
    if (newName !== "") setNewName("");
    if (newPhone !== "") setNewPhone("");
    getDataFromJSONDB();
  }, []);

  const getDataFromJSONDB = () => {
    try {
      personService.getAll().then((response) => setPersons(response));
      console.log(persons);
    } catch (err) {
      console.error(err);
      setPersons([]);
    }
  };
  const personDoesExist = (newName: string) =>
    persons.some((person) => person.name === newName);

  const findPerson = (newName: string) =>
    persons.find((person) => person.name === newName);

  const handleSubmit = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (personDoesExist(newName)) {
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
        ? handlePut(newName) // true - update
        : console.log("Abort"); // false abort
    } else {
      // person does not exist
      personService
        .create({
          name: newName,
          number: newPhone,
        })
        .then((response) => {
          setPersons((prev) => [...prev, response]);
          setStatus({ type: true, message: `Added ${newName}` });
        })
        .catch((e: Error | any) => {
          console.log(e.message);
          setStatus({ type: false, message: e.response.data.error });
        });
    }
  };

  const handleNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewName(e.target.value);
  };

  const handlePhoneChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.target.value);
    setNewPhone(e.target.value);
  };

  const handleSearchChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterPersonArray;
    setNewSearch(e.target.value);
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.getAttribute("data-index");
    const personToDelete = persons.filter((person) => person.id === id);
    if (personToDelete[0].id) {
      window.confirm(`Delete ${personToDelete[0].name} ?`)
        ? deletePerson(id)
        : console.log("Canceled");
    } else {
      console.log(`person id is undefined`);
    }
  };

  const deletePerson = (id: string | null) => {
    if (id === null) {
      throw new Error(`id null`);
    } else {
      personService
        .remove(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)))
        .catch((error) => {
          console.log(error);
          setStatus({
            type: false,
            message: `Information of ${newName} has already been removed from server`,
          });
        });
    }
  };

  const handlePut = (newName: string) => {
    const found = findPerson(newName);
    //console.log(JSON.stringify(found));

    if (found?.id !== undefined) {
      console.log("running");

      personService
        .update(found.id, {
          name: found.name,
          number: newPhone,
        })
        .then((response) =>
          setPersons((persons) =>
            persons.map((person) =>
              person.id === response.id
                ? { ...person, number: response.number }
                : person
            )
          )
        )
        .catch((e: Error) => console.log(e.message))
        .finally(() => {
          console.log(JSON.stringify(persons));
        });
    } else {
      console.log("Not Found");
    }
  };

  const filterPersonArray = persons.filter(({ name }) => {
    if (name.toLowerCase().includes(newSearch)) return name;
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification status={status} />
      <SearchFilter
        searchText={newSearch}
        handleSearchChanged={handleSearchChanged}
      />
      <AddNewPerson
        newName={newName}
        newPhone={newPhone}
        handleNameChanged={handleNameChanged}
        handlePhoneChanged={handlePhoneChanged}
        handleSubmit={handleSubmit}
      />
      <ShowAllPeople persons={persons} handleDelete={handleDelete} />
      <ShowFilteredPerson filterPersonArray={filterPersonArray} />
    </div>
  );
};
