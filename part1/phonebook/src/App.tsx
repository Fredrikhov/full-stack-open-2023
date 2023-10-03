/* eslint-disable react-hooks/exhaustive-deps */
import React, { MouseEvent, useEffect, useState } from "react";
import "./App.css";
import { SearchFilter } from "./components/SearchFilter";
import { AddNewPerson } from "./components/AddNewPerson";
import { ShowAllPeople } from "./components/ShowAllPeople";
import { ShowFilteredPerson } from "./components/ShowFilteredPerson";
import personService from "./services/persons";

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
      personService.getAll().then((response) => setPersons(response));
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

    /* check if person already exsist in arr and add */
    persons.some((person) => person.name === personObj.name)
      ? window.alert(`${personObj.name} is already added to phonebook`)
      : personService
          .create(personObj)
          .then((response) => setPersons((prev) => [...prev, response]));
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
      ? personService.remove(id)
      : console.log("Delete person canceled");
      

    /*window.confirm(`Delete ${personToDelete.name}`);
    personService.remove(id);*/
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
      <ShowAllPeople persons={persons} handleDelete={handleDelete} />
      <ShowFilteredPerson filterPersonArray={filterPersonArray} />
    </div>
  );
};
