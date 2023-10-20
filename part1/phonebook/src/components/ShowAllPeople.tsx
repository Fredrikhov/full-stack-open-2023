import React from "react";
import { Person } from "../App.tsx";

interface IShowAllPeople {
  persons: Person[];
  handleDelete: (e: React.MouseEvent<HTMLElement>) => void;
}

export const ShowAllPeople = ({ persons, handleDelete }: IShowAllPeople) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => {
          return (
            <li key={person.id}>
              {`${person.name} ${person.number}`}{" "}
              <button data-index={person.id} onClick={handleDelete}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
