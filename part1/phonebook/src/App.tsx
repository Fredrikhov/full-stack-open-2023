/* eslint-disable react-hooks/exhaustive-deps */
import React, { MouseEvent, useEffect, useState } from "react";
import "./App.css";
import { SearchFilter } from "./components/SearchFilter";
import { AddNewPerson } from "./components/AddNewPerson";
import { ShowAllPeople } from "./components/ShowAllPeople";
import { ShowFilteredPerson } from "./components/ShowFilteredPerson";
import axios from "axios";

interface Person {
  id: number;
  name: string;
  phoneNumber: string | number;
}

export const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    if (newName !== "") setNewName("");
    if (newPhone !== "") setNewPhone("");
    getDataFromJSONDB();
  }, []);

  const getDataFromJSONDB = () => {
    try {
      axios
        .get("http://localhost:3001/persons")
        .then((response) => setPersons(response.data));
    } catch (err) {
      console.error(err);
      setPersons([]);
    }
  };

  const handleSubmit = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const personObj = {
      name: newName,
      phoneNumber: newPhone,
      id: persons.length + 1,
    };
    persons.some((person) => person.name === personObj.name)
      ? window.alert(`${personObj.name} is already added to phonebook`)
      : setPersons((prev) => [...prev, personObj]);
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

  const filterPersonArray = persons.filter(({ name }) => {
    if (name.toLowerCase().includes(newSearch)) return name;
  });

  return (
    <div>
      <h2>Phonebook</h2>
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
      <ShowAllPeople persons={persons} />
      <ShowFilteredPerson filterPersonArray={filterPersonArray} />
    </div>
  );
};
