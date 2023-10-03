interface IShowFilteredPerson {
  filterPersonArray: {
    id: number;
    name: string;
    phoneNumber: number | string;
  }[];
}

export const ShowFilteredPerson = ({
  filterPersonArray,
}: IShowFilteredPerson) => {
  return (
    <>
      <h2>Filter's elements</h2>
      <ul>
        {filterPersonArray.map((person) => {
          return (
            <li key={person.id}>{`${person.name} ${person.phoneNumber}`}</li>
          );
        })}
      </ul>
    </>
  );
};
