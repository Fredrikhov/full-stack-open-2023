import React from "react";

interface IShowAllPeople {
  persons: {
    id: number;
    name: string;
    phoneNumber: number | string;
  }[];
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
              {`${person.name} ${person.phoneNumber}`} <button data-index={person.id} onClick={handleDelete}>Delete</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
