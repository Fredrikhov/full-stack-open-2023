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
  id: number;
  name: string;
  number: string | number;
}
[];

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
    } catch (err) {
      console.error(err);
      setPersons([]);
    }
  };

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
          id: persons[persons.length - 1].id + 1,
        })
        .then((response) => setPersons((prev) => [...prev, response]));
      setStatus({ type: true, message: `Added ${newName}` });
    }
  };

  const handleNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewName(e.target.value);
  };

  const handlePhoneChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewPhone(e.target.value);
  };

  const handleSearchChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterPersonArray;
    setNewSearch(e.target.value);
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    const id = Number(e.currentTarget.getAttribute("data-index"));
    const personToDelete = persons.filter((p) => p.id === id);
    window.confirm(`Delete ${personToDelete[0].name} ?`)
      ? deletePerson(id)
      : console.log("Delete person canceled");
    setPersons(personToDelete);
  };

  const deletePerson = (id: number) => {
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
  };

  const handlePut = (newName: string) => {
    const found = findPerson(newName);
    if (found != undefined) {
      personService
        .update(found.id, {
          name: found.name,
          number: newPhone,
          id: found.id,
        })
        .then((response) =>
          setPersons((persons) =>
            persons.map((person) =>
              person.id === response.id
                ? { ...person, number: response.number }
                : person
            )
          )
        );
    } else {
      console.log("Not Found");
    }
  };

  const filterPersonArray = persons.filter(({ name }) => {
    if (name.toLowerCase().includes(newSearch)) return name;
  });

  const personDoesExist = (newName: string) =>
    persons.some((person) => person.name === newName);

  const findPerson = (newName: string) =>
    persons.find((person) => person.name === newName);

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
