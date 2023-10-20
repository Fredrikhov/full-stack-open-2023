import { Person } from "../App.tsx";
interface IShowFilteredPerson {
  filterPersonArray: Person[];
}

export const ShowFilteredPerson = ({
  filterPersonArray,
}: IShowFilteredPerson) => {
  return (
    <>
      <h2>Filter's elements</h2>
      <ul>
        {filterPersonArray.map((person) => {
          return <li key={person.id}>{`${person.name} ${person.number}`}</li>;
        })}
      </ul>
    </>
  );
};
